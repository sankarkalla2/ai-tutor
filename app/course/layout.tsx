"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { CourseSidebar } from "@/modules/courses/components/course-sidebar";
import { ToggleLessonChatProvider } from "@/modules/lession/providers/store-provier";
import { usePathname } from "next/navigation";

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <SidebarProvider>
        {pathname.includes("/chat") ? <AppSidebar /> : <CourseSidebar />}
        <ToggleLessonChatProvider>
          <SidebarInset>{children}</SidebarInset>
        </ToggleLessonChatProvider>
      </SidebarProvider>
    </>
  );
};

export default CourseLayout;
