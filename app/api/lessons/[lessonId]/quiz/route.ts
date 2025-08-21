import { getUserActiveSubscription } from "@/app/server/user";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { google } from "@ai-sdk/google";
import { generateObject, streamObject } from "ai";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const context = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user)
    return NextResponse.json({ message: "You not logged" }, { status: 401 });

  try {
    // const isProUser = await getUserActiveSubscription();
    // console.log(isProUser);
    // if (!isProUser || isProUser.status !== "active") {
    //   return NextResponse.json({ message: "Upgrade to take unimited access" }, { status: 405});
    // }

    const isLessonExisted = await db.lesson.findUnique({
      where: {
        userId: session.user.id,
        id: (await params).lessonId,
      },
    });
    console.log(isLessonExisted);
    if (!isLessonExisted || !isLessonExisted.content) {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    const result = streamObject({
      model: google("gemini-1.5-flash"),
      prompt: `
            You are given a lesson or educational content. Your task is to create a multiple-choice quiz based on that lesson.
            Each quiz question should include:
            - A clear and relevant question
            - One correct answer (either the text of the correct option or the index as a string)

            Format your response to match the following schema.

            Lesson Content:
            ${isLessonExisted.content}
`,
      schema: z.object({
        quiz: z.array(
          z.object({
            id: z.string(),
            question: z.string(),
            options: z.array(z.string()).min(2).max(5),
            answer: z
              .string()
              .describe(
                'Must match one of the provided options or be the index of the correct option as a string (e.g., "1").'
              ),
          })
        ),
      }),
    });

    return result.toTextStreamResponse();
  } catch (err) {
    return NextResponse.json(
      { message: "Interval server error" },
      { status: 500 }
    );
  }
}
