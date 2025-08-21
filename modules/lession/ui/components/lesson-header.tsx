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
      <div className="flex flex-col w-full gap-0.5 items-start justify-start">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="truncate">
          <BreadcrumbList>
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
              <BreadcrumbLink href={`/course/${courseId}`}>
                {courseName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Course Stats Badges */}
        <div className="flex items-center gap-x-2">
          {/* <span className="bg-chart-1 text-blue-800 text-[0.67rem] py-0.3 rounded-full px-2">
            {chaptersCount} Chapters
          </span>
          <span className="bg-chart-2  text-[0.67rem] py-0.3 rounded-full px-2">
            {modulesCount} Modules
          </span>
          <span className="bg-green-600 text-white  text-[0.67rem] py-0.3 rounded-full px-2">
            30% completed
          </span> */}
          <Badge
            size="xs"
            shape={"circle"}
            variant={"info"}
            appearance={"light"}
          >
            {chaptersCount} Chapters
          </Badge>
          <Badge
            size="xs"
            shape={"circle"}
            variant={"primary"}
            appearance={'outline'}
          >
            {modulesCount} Modules
          </Badge>
          <Badge
            size="xs"
            shape={"circle"}
            appearance={"default"}
            variant={"success"}
          >
            30% completed
          </Badge>
        </div>
      </div>
    </header>
  );
}
