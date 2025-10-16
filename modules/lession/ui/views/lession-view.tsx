"use client";
import { useParams } from "next/navigation";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useLessonView } from "../../hooks/use-lesson-view";
import { LessonViewChat } from "../components/chat-component";
import { LessonHeader } from "../components/lesson-header";
import LessonChatDrawer from "../components/lesson-chat-drawer";
import ErrorPage from "@/components/error";
import { LessonActions } from "../components/lesson-actions";
import { LessonContent } from "../components/lesson-content";

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
    prevLessonId,
    nextLessonId,
    isOpen,
    toggleOpen,
    regeneratePrompt,
    setRegeneratePrompt,
  } = useLessonView(params.lessonId, params.id);

  if (isError) {
    return <ErrorPage errorMessage="Error fetching lesson. Please try again" />;
  }




  return (
    <div className="flex flex-col h-screen">
      <LessonHeader
        courseName={data?.lesson?.module.course.title || "No title"}
        courseId={data?.lesson?.module.course.id || ""}
      />
      <LessonChatDrawer open={isOpen} onOpenchange={toggleOpen} />{" "}
      {/* Fixed: onOpenChange */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel: Lesson Section */}
        <ResizablePanel defaultSize={80} minSize={60}>
          <div className="h-full overflow-y-auto scrollbar-hide p-4 md:px-8 lg:px-20 max-w-5xl mx-auto">
            {/* Actions Header */}
            <div className="flex flex-col justify-end items-center gap-x-1 mb-4">
              <LessonActions
                isLoading={isLoading}
                isOpen={isOpen}
                toggleOpen={toggleOpen}
                generateLesson={generateLesson}
                toggleLesson={toggleLession}
                isPending={isPending}
                data={data}
                open={open}
                setOpen={setOpen}
                regeneratePrompt={regeneratePrompt}
                setRegeneratePrompt={setRegeneratePrompt}
              />
            </div>

            {/* Content */}
            <LessonContent
              generateLesson={generateLesson}
              isLoading={isLoading}
              streamingText={streamingText}
              isStreaming={isStreaming}
              data={data}
              prevLessonId={prevLessonId || null}
              nextLessonId={nextLessonId || null}
              params={params}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden md:flex" />

        {/* Right Panel: Chat Section */}
        {isOpen && (
          <ResizablePanel
            defaultSize={20}
            minSize={25}
            className="hidden md:flex"
          >
            <LessonViewChat />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default LessonView;
