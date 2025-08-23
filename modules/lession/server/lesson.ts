"use server";

import { getUserActiveSubscription } from "@/server/user";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateObject, generateText } from "ai";
import { headers } from "next/headers";
import z from "zod";

export const getLessionById = async (lessonId: string, courseId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { status: 401, message: "You are not logged in", lesson: null };
  }

  try {
    const lesson = await db.lesson.findUnique({
      where: {
        id: lessonId,
        userId: session.user.id,
      },
      include: {
        module: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return { status: 404, message: "Course not found", lesson: null };
    }

    return {
      status: 200,
      message: "Success",
      lesson,
    };
  } catch (error) {
    return { status: 500, message: "Internel Server Error" };
  }
};

export const toggleLessionStatus = async (lessionId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("called tooggle");
  if (!session) return { status: 401, message: "You are Unauthrized" };

  try {
    const isLessionExisted = await db.lesson.findUnique({
      where: {
        id: lessionId,
        userId: session.user.id,
      },
    });
    if (!isLessionExisted || isLessionExisted.status === "NOT_GENERATED") {
      return { status: 400, message: "This lesson is not belogns to you" };
    }

    await db.lesson.update({
      where: {
        id: isLessionExisted.id,
      },
      data: {
        status:
          isLessionExisted.status === "GENERATED" ? "COMPLETED" : "GENERATED",
      },
    });

    return { status: 200 };
  } catch (error) {
    return { status: 500, message: "Internel server error" };
  }
};

export const generateQuizQuestions = async (lessonId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return { status: 401, message: "You Not Logged" };

  try {
    const isProUser = await getUserActiveSubscription();
    if (!isProUser || isProUser.status !== "active") {
      return { status: 403, message: "Upgrade to take unlimited quiz" };
    }

    const isLessonExisted = await db.lesson.findUnique({
      where: {
        userId: session.user.id,
        id: lessonId,
      },
    });
    if (!isLessonExisted || !isLessonExisted.content) {
      return { status: 404, message: "Lesson not found" };
    }

    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      prompt: `
            You are given a lesson or educational content. Your task is to create a multiple-choice quiz based on that lesson.
            Each quiz question should include:
            - A clear and relevant question
            - 2 to 5 short answer options
            - One correct answer (either the text of the correct option or the index as a string)

            Format your response to match the following schema.

            Lesson Content:
            ${isLessonExisted.content}
`,
      schema: z.object({
        quiz: z.array(
          z.object({
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

    return { status: 200, quiz: result.object.quiz };
  } catch (error) {
    return { status: 500, message: "Internel server error" };
  }
};
