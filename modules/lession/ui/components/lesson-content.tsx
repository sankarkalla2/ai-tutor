import Link from "next/link";

import { Response } from "@/components/ai-elements/response";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GhostIcon, RotateCcw } from "lucide-react";

import { LessonContentSkeleton } from "./lesson-content-skeleton";
import QuizPage from "./lesson-quiz-page";

export const LessonContent = ({
  generateLesson,
  isLoading,
  streamingText,
  isStreaming,
  data,
  prevLessonId,
  nextLessonId,

  params,
}: {
  isLoading: boolean;
  streamingText: string;
  isStreaming: boolean;
  data: any;
  prevLessonId: string | null;
  nextLessonId: string | null;
  params: { id: string; lessonId: string };
  generateLesson: (prompt?: string, regenerate?: boolean) => void;
}) => {
  if (isLoading) {
    return <LessonContentSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="min-h-[70vh]">
        {isStreaming && !streamingText.length && (
          <Empty className="w-full">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Spinner />
              </EmptyMedia>
              <EmptyTitle></EmptyTitle>
              <EmptyDescription>
                Please wait while we process your request. Do not refresh the
                page.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {/* Lesson Response */}

        <Response className="leading-relaxed text-foreground text-balance">
          {streamingText || data?.lesson?.content || ""}
        </Response>

        {!isStreaming && !data.lesson?.content?.length && (
          <div className="flex w-full h-full justify-center items-center pt-32">
            <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <GhostIcon />
                </EmptyMedia>
                <EmptyTitle>No lesson content</EmptyTitle>
                <EmptyDescription>
                  This lesson has no content yet.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateLesson(undefined, true)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </div>

      {/* Quiz Page */}
      {streamingText.length > 0 ||
        (data?.lesson?.content?.length > 0 && (
          <QuizPage lessonId={params.lessonId} />
        ))}

      {/* Separator and Navigation */}
      <Separator />
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={!prevLessonId} asChild>
          <Link href={`/course/${params.id}/lesson/${prevLessonId}`}>
            Previous
          </Link>
        </Button>
        <Button disabled={!nextLessonId} asChild>
          <Link href={`/course/${params.id}/lesson/${nextLessonId}`}>Next</Link>
        </Button>
      </div>
    </div>
  );
};
