import { getUserActiveSubscription } from "@/app/server/user";
import { db } from "@/lib/db";
import { lesson_QA_TutorPrompt } from "@/lib/prompts/lesson-prompt";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(
  req: Request,
  { params: { lessonId } }: { params: { lessonId: string } }
) {
  const { messages, userId }: { messages: UIMessage[]; userId: string } =
    await req.json();
  const userSubscription = await getUserActiveSubscription();
  if (!userSubscription) {
    return NextResponse.json(
      { message: "Upgrade to get unlimited access" },
      { status: 403 }
    );
  }

  const lesson = await db.lesson.findUnique({
    where: {
      id: lessonId,
    },
    include: {
      module: {
        include: {
          course: {
            select: {
              title: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!lesson || !lesson.content)
    return NextResponse.json({ message: "not found" }, { status: 404 });

  const result = streamText({
    model: openai("gpt-5-nano"), // Use your preferred model
    system: lesson_QA_TutorPrompt(
      lesson.module.course.title,
      lesson.module.course.description,
      lesson.title,
      lesson.description,
      lesson.content
    ),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
