"use server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserActiveSubscription } from "@/server/user";
import { gateway } from "@ai-sdk/gateway";

export const createQuestionsByTopic = async (
  format: "course" | "guide" | "roadmap",
  topic: string
) => {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      mode: "json",
      output: "object",
      schema: z.object({
        questions: z
          .array(
            z.object({
              question: z.string(),
              options: z.array(z.string()).optional(),
            })
          )
          .describe(
            "List of questions to ask the user. Each question may optionally include a list of one-word or short answer options."
          ),
      }),
      prompt: `You are an expert in creating a ${format} based on a given ${topic}. Generate a list of clear, concise questions ) that to help design a ${format} for the topic "${topic}". Focus on making the answers easy to select or fill out with one word.

      -- we will create lession with ai as text based only.
      -- If question needs to be answered with multiple words or multiple answers then don't include options. otherswise include options.

      `,
    });

    return object.questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
};

type FollowedQuestions = {
  questions?: {
    question: string;
    answer: string;
  }[];
};
export const createCourseOverview = async (
  topic: string,
  format: "course" | "guide" | "roadmap",
  followedQuestions: FollowedQuestions
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { status: 401, message: "Please login to create course" };
  }

  const userSubscription = await getUserActiveSubscription();
  if (!userSubscription) {
    return { status: 401, message: "Upgrade to get unlimited access" };
  }

  const { object } = await generateObject({
    model: gateway("openai/gpt-5"),
    providerOptions: {
      google: {
        structuredOutputs: true,
      },
    },
    schema: z.object({
      title: z.string().describe("Course title"),
      description: z.string().describe("Course description"),
      modules: z.array(
        z.object({
          moduleTitle: z.string().describe("Module title"),
          moduleDescription: z.string().describe("Module description"),
          lessons: z.array(
            z.object({
              lessonTitle: z.string().describe("Lesson title"),
              lessonDescription: z
                .string()
                .describe(
                  "Brief descriptiion though we will use this description to generate whole lesson with ai."
                ),
            })
          ),
        })
      ),
    }),

    prompt: `Create a comprehensive course overview for the topic: "${topic}".
  

    ${
      followedQuestions.questions?.length
        ? `Consider these questions and answers to make the course more relevant:
      ${followedQuestions.questions
        .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
        .join("\n\n")}`
        : ""
    }

    Generate:
    1. A compelling course title
    2. A detailed course description (2-3 paragraphs)
    3. 4-6 modules, each with:
       - Module title and description
       - 3-6 lessons per module with:
         - Lesson title
         - Brief description of what will be covered, we will give this description to to ai to generate whole lession.

    Make sure the course structure is logical and progressive, building from basic concepts to advanced topics.
    Focus on practical, actionable content that students can apply.`,
  });

  try {
    const course = await db.course.create({
      data: {
        title: object.title,
        description: object.description,
        userId: session.user.id,

        modules: {
          create: object.modules.map((module) => ({
            title: module.moduleTitle,
            lessons: {
              create: module.lessons.map((lesson) => ({
                title: lesson.lessonTitle,
                description: lesson.lessonDescription,
                userId: session.user.id,
              })),
            },
          })),
        },
      },
    });

    return {
      status: 200,
      message: "Course created successfully",
      id: course.id,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return { status: 500, message: "Error creating course" };
  }
};
