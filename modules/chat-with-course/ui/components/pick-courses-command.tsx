"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import Link from "next/link";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

interface PickCoursesCommandProps {
  courseId: string;
}
export function PickCoursesCommand({ courseId }: PickCoursesCommandProps) {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: () => getAllUserCourses(),
  });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="flex items-center gap-x-2 text-sm  py-1 px-3 rounded-md cursor-pointer w-[250] justify-between dark:bg-muted bg-accent leading-relaxed"
        onClick={() => setOpen(true)}
      >
        Search Courses...
        <KbdGroup>
          <Kbd className="bg-sidebar-primary-foreground">Ctrl + K</Kbd>
        </KbdGroup>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search course by title..." />
        <CommandList>
          {isLoading ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : !data?.courses || data?.courses?.length === 0 ? (
            <CommandEmpty>No Courses Found.</CommandEmpty>
          ) : (
            <CommandGroup heading="User Courses">
              {data?.courses.map((course) => (
                <CommandItem
                  key={course.id}
                  onSelect={() => setOpen(false)}
                  className={`${
                    course.id === courseId
                      ? "bg-primary text-accent-foreground"
                      : ""
                  } `}
                  asChild
                >
                  <Link href={`/chat/courses/${course.id}`} prefetch>
                    <ArrowRight />
                    <span>{course.title}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
