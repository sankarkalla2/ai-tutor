"use client";

import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";

interface LessonHeaderProps {
  courseId: string;
  courseName: string;
}

export function LessonHeader({ courseId, courseName }: LessonHeaderProps) {
  return (
    <header className="border-b border-gray-200 px-2 md:px-4 py-3 flex items-center gap-x-2">
      <MobileSidebarToggleButton />
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
              <BreadcrumbLink href={`/course/${courseId}`}>
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
      </div>
    </header>
  );
}
