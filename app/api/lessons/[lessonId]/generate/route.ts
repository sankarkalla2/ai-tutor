// app/api/lessons/[lessonId]/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";
import { createLessonGenerationPrompt } from "@/lib/prompts/lesson-prompt";
import { google } from "@ai-sdk/google";
import { getUserActiveSubscription } from "@/server/user";

const LessonOutputSchema = z.object({
  lessonContent: z.string(),
  previewQuestions: z.array(
    z.object({
      question: z.string(),
    })
  ),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lesson = await db.lesson.findUnique({
    where: {
      id: (await params).lessonId,
      module: {
        course: { userId: session.user.id },
      },
    },
    include: {
      module: { include: { course: true } },
    },
  });

  if (!lesson)
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  if (lesson.status !== "NOT_GENERATED") {
    return NextResponse.json(
      { error: "Lesson already generated" },
      { status: 400 }
    );
  }

  const userSubscription = await getUserActiveSubscription();
  if (!userSubscription) {
    return NextResponse.json(
      { message: "Upgrade to get unlimited access" },
      { status: 403 }
    );
  }

  let lessonContent = "";
  let previewQuestions: any[] = [];

  const { partialObjectStream } = await streamObject({
    model: openai("gpt-4.1-nano"),
    schema: LessonOutputSchema,
    prompt: createLessonGenerationPrompt(
      lesson.module.course.title,
      lesson.module.course.description || "",
      lesson.module.title,
      lesson.title,
      lesson.description
    ),

    onFinish: async (result) => {
      console.log(result);
      console.log(result.object?.lessonContent);
      await db.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          content: result.object?.lessonContent,
          previewQuestions: result.object?.previewQuestions.map(
            (question) => question?.question
          ),
          status: "GENERATED",
        },
      });
    },
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const partial of partialObjectStream) {
        if (partial.lessonContent) lessonContent = partial.lessonContent;
        if (partial.previewQuestions)
          previewQuestions = partial.previewQuestions;

        controller.enqueue(
          new TextEncoder().encode(
            JSON.stringify({ lessonContent, previewQuestions }) + "\n"
          )
        );
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const body = await req.json();
  const { regeneratePrompt } = body;
  console.log(regeneratePrompt);
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lesson = await db.lesson.findUnique({
    where: {
      id: (await params).lessonId,
      module: {
        course: { userId: session.user.id },
      },
    },
    include: {
      module: { include: { course: true } },
    },
  });

  if (!lesson)
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });

  const userSubscription = await getUserActiveSubscription();
  if (!userSubscription) {
    return NextResponse.json(
      { message: "Upgrade to get unlimited access" },
      { status: 403 }
    );
  }

  let lessonContent = "";
  let previewQuestions: any[] = [];
  const { partialObjectStream } = await streamObject({
    model: google("gemini-2.5-flash"),
    schema: LessonOutputSchema,

    prompt: createLessonGenerationPrompt(
      lesson.module.course.title,
      lesson.module.course.description || "",
      lesson.module.title,
      lesson.title,
      lesson.description,
      regeneratePrompt
    ),
    maxOutputTokens: 50,

    onFinish: async (result) => {
      console.log(result);
      console.log(result.object?.lessonContent);
      await db.lesson.update({
        where: {
          id: lesson.id,
        },
        data: {
          content: result.object?.lessonContent,
          previewQuestions: result.object?.previewQuestions.map(
            (question) => question?.question
          ),
          status: "GENERATED",
        },
      });
    },
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const partial of partialObjectStream) {
        if (partial.lessonContent) lessonContent = partial.lessonContent;
        if (partial.previewQuestions)
          previewQuestions = partial.previewQuestions;

        controller.enqueue(
          new TextEncoder().encode(
            JSON.stringify({ lessonContent, previewQuestions }) + "\n"
          )
        );
      }
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
