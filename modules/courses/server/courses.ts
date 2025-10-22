"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { SingleParserBuilder, Values } from "nuqs";

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

type Params = Values<{
  page: Omit<SingleParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  pageSize: Omit<SingleParserBuilder<number>, "parseServerSide"> & {
    readonly defaultValue: number;
    parseServerSide(value: string | string[] | undefined): number;
  };
  search: Omit<SingleParserBuilder<string>, "parseServerSide"> & {
    readonly defaultValue: string;
    parseServerSide(value: string | string[] | undefined): string;
  };
}>;

export const getAllUserCourses = async (params: Params) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return { status: 401, message: "Please login to view courses." };
  }
  const { page, pageSize, search } = params;


  try {
    const [coursesCount, courses] = await Promise.all([
      db.course.count({
        where: {
          userId: session.user.id,
        },
      }),
      db.course.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          userId: session.user.id,
          title: {
            contains: search,
            mode: "insensitive",
          },
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
        orderBy: {
          updatedAt: "desc",
        },
      }),
    ]);

    const totalPages = Math.ceil(coursesCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // const userCourses = await db.course.findMany({
    //   where: {
    //     userId: session.user.id,
    //   },
    //   select: {
    //     id: true,
    //     title: true,
    //     description: true,
    //     _count: {
    //       select: {
    //         modules: true,
    //       },
    //     },
    //     modules: {
    //       select: {
    //         id: true,
    //         lessons: {
    //           select: {
    //             status: true,
    //             id: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const items = {
      courses,
      coursesCount,
      page,
      pageSize,
      hasNextPage,
      hasPrevPage,
    };
    return { status: 200, items, message: "Success" };
  } catch (error) {
    return { status: 500, message: "Internel server error" };
  }
};


