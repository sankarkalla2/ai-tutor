"use server"
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const getUserCourses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { status: 401, message: "You are unauthrized" };
  }

  const userCourses = await db.course.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return {
    status: 200,
    courses: userCourses,
  };
};
