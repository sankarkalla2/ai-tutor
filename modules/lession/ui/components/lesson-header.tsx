"use client";

import { Home, PanelLeft, SidebarOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/components/ui/sidebar";
import { useToggleRightSide } from "../../hooks/use-toggle-right-sidebar";
import { Button } from "@/components/ui/button";

interface LessonHeaderProps {
  courseId: string;
  courseName: string;
  chapterName: string;
  moduleName: string;
  chaptersCount: number;
  modulesCount: number;
}

export function LessonHeader({
  courseId,
  courseName,
  chapterName,
  moduleName,
  chaptersCount,
  modulesCount,
}: LessonHeaderProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="border-b border-gray-200 px-2 md:px-4 py-3 flex items-center gap-x-2">
      <Button variant={"ghost"} size={"icon"} onClick={toggleSidebar}>
        <PanelLeft onClick={toggleSidebar} className="" />
      </Button>
      <div className="flex items-center justify-between w-full">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList >
            <BreadcrumbItem>
              <BreadcrumbLink href="/" asChild>
                <Home className="w-4 h-4 text-gray-500" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/courses/${courseId}`}>
                Courses
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${courseId}`}>{courseName}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Course Stats Badges */}
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {chaptersCount} Chapters
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {modulesCount} Modules
          </Badge>
        </div>
      </div>
    </header>
  );
}
