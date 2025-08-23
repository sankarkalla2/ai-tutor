"use client";

import { Skeleton } from "@/components/ui/skeleton";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";
import { LessonContentSkeleton } from "@/modules/lession/ui/components/lesson-content-skeleton";
import LessonChatLoadingSkeleton from "@/modules/lession/ui/components/chat-loading-skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Lesson Header Skeleton */}
      <div className="border-b p-4 flex items-center justify-between">
        <MobileSidebarToggleButton />
        <Skeleton className="h-6 w-48" /> {/* Course title */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-20" /> {/* Chapter info */}
          <Skeleton className="h-4 w-20" /> {/* Module info */}
        </div>
      </div>

      {/* Main Content Area */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel: Lesson Content Skeleton */}
        <ResizablePanel defaultSize={80} minSize={60}>
          <LessonContentSkeleton />
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden md:flex" />

        {/* Right Panel: Chat Skeleton */}
        <ResizablePanel
          defaultSize={18}
          minSize={25}
          className="hidden md:flex"
        >
          <LessonChatLoadingSkeleton />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Loading;
