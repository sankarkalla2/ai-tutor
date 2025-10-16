import { streamText, UIMessage, convertToModelMessages } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
    courseId,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
    courseId: string;
  } = await req.json();

  console.log("id", courseId);
  const isCourseExisted = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });
  if (!isCourseExisted)
    return NextResponse.json({ message: "course not found" }, { status: 404 });

  const result = streamText({
    model: webSearch ? "perplexity/sonar" : gateway("openai/gpt-4o-mini"),
    messages: convertToModelMessages(messages),
    system: `You are an expert tutor.
            Below is a course with its name, description, lessons, and lesson descriptions.

            When the student asks questions, you must:
            Stay within the context of this course.
            Explain concepts in clear, step-by-step ways.
            Use examples, analogies, or code snippets where appropriate.
            When relevant, reference specific lessons from the course.
            Provide structured answers (headings, bullet points, numbered lists) to improve readability.
            If asked, you can generate practice questions, summaries, or quizzes related to the course through  one after one only.
            Do not answer unrelated topics outside the course scope.

            Course Name: ${isCourseExisted.title}
            Course Description: ${isCourseExisted.description}

            Lessons title:
            ${isCourseExisted.modules.map((module) =>
              module.lessons
                .map((lesson) => `lesson title: ${lesson.title}`)
                .join("\n")
            )}`,
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
