"use client";
import { useParams } from "next/navigation";
import "katex/dist/katex.min.css";

import {
  X,
  Check,
  Edit2,
  Edit,
  RotateCcw,
  MessageCircle,
  MessageCircleOff,
  Loader2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "@/components/spinner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useLessonView } from "../../hooks/use-lesson-view";

import { Response } from "@/components/markdown-content";
import { ModalProvider } from "@/components/modal-provider";
import { LessonViewChat } from "../components/chat-component";
import { LessonHeader } from "../components/lesson-header";
import LessonChatDrawer from "../components/lesson-chat-drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { useToggleLessonChat } from "../../providers/store-provier";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardTable,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import QuizPage from "../components/lesson-quiz-page";
import { experimental_useObject } from "@ai-sdk/react";
import z from "zod";
import { useQuery } from "@tanstack/react-query";
import { getCoursePreiview } from "@/modules/courses/server/courses";
import Link from "next/link";

const LessonView = () => {
  const params = useParams<{ id: string; lessonId: string }>();
  const {
    data,
    generateLesson,
    isLoading,
    isError,
    toggleLession,
    isPending,
    open,
    setOpen,
    streamingText,
    isStreaming,
  } = useLessonView(params.lessonId, params.id);
  const isMobile = useIsMobile();
  const { object, submit } = experimental_useObject({
    api: `/api/lessons/${params.lessonId}/quiz`,
    schema: z.object({
      quiz: z.array(
        z.object({
          id: z.string(),
          question: z.string(),
          options: z.array(z.string()).min(2).max(5),
          answer: z.string(),
        })
      ),
    }),
  });

  const { data: courseIndex, isLoading: isLoadingCourse } = useQuery({
    queryKey: ["get-course-preview", params.id],
    queryFn: () => getCoursePreiview(params.id),
  });

  let prevLessonId = undefined;
  let nextLessonId = undefined;
  let currentLessonId = params.lessonId;

  if (courseIndex?.course) {
    const allLessons = courseIndex.course.modules.flatMap(
      (module) => module.lessons
    );
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLessonId
    );

    if (currentIndex > 0) {
      prevLessonId = allLessons[currentIndex - 1].id;
    }
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      nextLessonId = allLessons[currentIndex + 1].id;
    }
  }

  const { isOpen, toggleOpen } = useToggleLessonChat((state) => state);
  if (isError) return <div>Error loading course data</div>;

  return (
    <div className="flex flex-col h-screen">
      <LessonHeader
        courseName={data?.lesson?.module.course.title || "No title"}
        courseId={data?.lesson?.module.course.id || ""}
        chapterName="1"
        moduleName="1"
        chaptersCount={3}
        modulesCount={3}
      />
      <LessonChatDrawer open={isOpen} onOpenchange={() => toggleOpen()} />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* ===== LEFT: Lesson Section ===== */}
        <ResizablePanel defaultSize={80} minSize={60}>
          <div className="h-full overflow-y-auto scrollbar-hide p-4 md:px-8 lg:px-20  max-w-5xl mx-auto">
            {/* --- Top Controls --- */}
            <div className="flex justify-end items-center gap-x-1 mb-4">
              {/* Toggle Chat */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleOpen()}
                disabled={isLoading}
              >
                {isOpen ? <MessageCircleOff /> : <MessageCircle />}
              </Button>

              {/* Edit & Regenerate */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoading}>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => generateLesson(undefined, true)}
                  >
                    <RotateCcw /> Regenerate
                  </DropdownMenuItem>

                  <ModalProvider
                    open={open}
                    onOpenChange={() => setOpen(false)}
                    trigger={
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          setOpen(true);
                        }}
                      >
                        <Edit2 /> Modify Prompt
                      </DropdownMenuItem>
                    }
                    title="Edit Lesson"
                    description="Help AI to generate a lesson for you"
                  >
                    <Textarea placeholder="eg: make sure to add section ..." />
                  </ModalProvider>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mark Done / Not Done */}
              {!isLoading && (
                <Badge
                  className="cursor-pointer"
                  variant={
                    data?.lesson && data.lesson.status === "COMPLETED"
                      ? "destructive"
                      : "primary"
                  }
                  onClick={() => toggleLession()}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin" /> Please wait.
                    </>
                  ) : data?.lesson && data.lesson.status === "COMPLETED" ? (
                    <>
                      <X /> Mark As Not Done
                    </>
                  ) : (
                    <>
                      <Check /> Mark As Done
                    </>
                  )}
                </Badge>
              )}
            </div>

            {/* --- Lesson Content --- */}
            {!isLoading ? (
              <div className="space-y-4">
                <Response>
                  {streamingText ||
                    (data?.lesson && data?.lesson.content) ||
                    ""}
                </Response>
                <QuizPage lessonId={params.lessonId} />
                <div className="flex items-center justify-between">
                  <Button disabled={!prevLessonId} asChild>
                    <Link href={`/course/${params.id}/lesson/${prevLessonId}`}>
                      Prev{" "}
                    </Link>
                  </Button>
                  <Button disabled={!nextLessonId} asChild>
                    <Link href={`/course/${params.id}/lesson/${nextLessonId}`}>
                      Next{" "}
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden md:flex" />

        {/* ===== RIGHT: Chat Section ===== */}
        {isOpen && (
          <ResizablePanel
            defaultSize={18}
            minSize={25}
            className="hidden md:flex"
          >
            <LessonViewChat />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      {/* <div className="w-full flex justify-center">
        <ManagementBar />
      </div> */}
    </div>
  );
};

export default LessonView;
