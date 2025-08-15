"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const getCoursePreiview = async (courseId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { status: 401, message: "You are not logged in" };
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId: session.user.id,
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });

  if (!course)
    return {
      status: 400,
      message: "No course found!.",
    };

  return { status: 200, course: course };
};

export const getAllUserCourses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { status: 401, message: "Please login to view courses." };
  }

  try {
    const userCourses = await db.course.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        _count: {
          select: {
            modules: true,
          },
        },
        modules: {
          select: {
            id: true,
            lessons: {
              select: {
                status: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return { status: 200, courses: userCourses, message: "Success" };
  } catch (error) {
    return { status: 500, message: "Internel server error" };
  }
};
