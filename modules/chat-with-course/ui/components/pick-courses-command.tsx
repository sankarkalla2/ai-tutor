"use client";

import * as React from "react";
import {
  ArrowRight,
  Calculator,
  Calendar,
  CreditCard,
  ExternalLink,
  Folder,
  Link2,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import Link from "next/link";

interface PickCoursesCommandProps {
  courseId: string;
}
export function PickCoursesCommand({ courseId }: PickCoursesCommandProps) {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, isError } = useQuery({
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
        className="flex items-center gap-x-2 text-sm  text-muted-foreground py-1 px-3 rounded-lg cursor-pointer w-[250] justify-between dark:bg-muted bg-secondary leading-relaxed"
        onClick={() => setOpen(true)}
      >
        Search Courses...
        <kbd className="flex items-center gap-x-1">
          <span className="text-xs bg-background  pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            ⌘
          </span>
          <span className="bg-background  pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            J
          </span>
        </kbd>
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
                  <Link href={`/chat/courses/${course.id}`}>
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
