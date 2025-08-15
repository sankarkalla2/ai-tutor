"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { headers } from "next/headers";

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
