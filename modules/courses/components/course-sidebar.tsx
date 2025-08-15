"use client";

import { authClient } from "@/lib/auth-client";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
  BookOpen,
  ChevronDown,
  Circle,
  CircleCheckBig,
  Folder,
  LogIn,
  PanelLeft,
  PanelRight,
  Play,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { useCourseViewId } from "../hooks/use-course-view-id";
import { NavUser } from "@/components/sidebar/nav-user";
export function CourseSidebar() {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const session = authClient.useSession();
  const { data, isLoading, isError } = useCourseViewId(params.id);
  const { open, toggleSidebar, setOpen, isMobile } = useSidebar();

  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Skeleton className="h-6 w-24" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <Skeleton className="h-4 w-20" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-28 ml-4 mb-1" />
                  ))}
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (isError) return <div>Error loading course data</div>;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <BookOpen />
              <span>AI Tutor</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-xs ">
            Course Content
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {data?.course?.modules.map((module, moduleIndex) => {
                const completed = module.lessons.filter(
                  (l) => l.status === "COMPLETED"
                ).length;
                const total = module.lessons.length;

                return (
                  <SidebarMenuItem key={module.id} className="">
                    <Collapsible defaultOpen={moduleIndex === 0} className="">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-sm">
                          <span className="truncate">{module.title}</span>

                          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="ml-4 mt-1 space-y-1">
                        {module.lessons.map((lesson) => {
                          const isActive =
                            pathname.split("/").pop() === lesson.id;

                          return (
                            <SidebarMenuSub key={lesson.id}>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                  size="sm"
                                  isActive={isActive}
                                  asChild
                                  className={`text-[0.82rem] text-muted-foreground`}
                                >
                                  <Link
                                    href={`/course/${params.id}/lesson/${lesson.id}`}
                                  >
                                    {lesson.status === "COMPLETED" ? (
                                      <CircleCheckBig className="h-3 w-3 !text-green-500" />
                                    ) : lesson.status === "GENERATED" ? (
                                      <CircleCheckBig className="h-3 w-3 text-muted-foreground" />
                                    ) : (
                                      <Circle className="h-3 w-3 text-muted-foreground" />
                                    )}
                                    <span className="truncate flex-1">
                                      {lesson.title}
                                    </span>
                                    {isActive && (
                                      <Play className="h-3 w-3 text-primary" />
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!open && !isMobile && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setOpen(true)} tooltip={'Open sidebar ctrl+b'}>
                <PanelRight />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {session.isPending ? (
          <Skeleton className="w-full h-10" />
        ) : session.data?.user ? (
          <NavUser
            avatar={session.data.user.image}
            name={session.data.user.name}
            email={session.data.user.email}
          />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive className="font-semibold" asChild>
                <Link href={"/sign-in"}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
