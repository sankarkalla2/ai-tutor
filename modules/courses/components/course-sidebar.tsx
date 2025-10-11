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
  Sparkles,
  StarIcon,
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
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { useCourseViewId } from "../hooks/use-course-view-id";
import { NavUser } from "@/components/sidebar/nav-user";
import { getUserActiveSubscription } from "@/server/user";
import { useQuery } from "@tanstack/react-query";
import UpgradeCard from "@/components/upgrade-card";
import { Button } from "@/components/ui/button";
import UserFeedback from "@/components/user-feedback";
export function CourseSidebar() {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const session = authClient.useSession();
  const { data, isLoading, isError } = useCourseViewId(params.id);
  const { open, toggleSidebar, setOpen, isMobile } = useSidebar();
  const { data: userSubscription, isLoading: isGetSubscriptionLoading } =
    useQuery({
      queryKey: ["get-user-subscription"],
      queryFn: () => getUserActiveSubscription(),
    });

  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size={"lg"} variant={"outline"}>
                <Link href={"/"}>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <BookOpen className="size-4" />
                  </div>
                </Link>
                <Link href={"/"}>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{"AI Tutor"}</span>
                    <span className="truncate text-xs">
                      {"Heaven for learning"}
                    </span>
                  </div>
                </Link>
                <PanelRight className="ml-auto" onClick={toggleSidebar} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Course Content</SidebarGroupLabel>
            <SidebarGroupContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <SidebarMenuSkeleton className="h-6 w-full mb-2" />
                  {[...Array(4)].map((_, j) => (
                    <SidebarMenuSkeleton
                      key={j}
                      className="h-6 w-full ml-4 mb-1"
                    />
                  ))}
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Skeleton className="h-10 w-full rounded-md bg-muted" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }

  if (isError) return <div>Error loading course data</div>;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} variant={"outline"}>
              <Link href={"/"}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookOpen className="size-4" />
                </div>
              </Link>
              <Link href={"/"}>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{"AI Tutor"}</span>
                  <span className="truncate text-xs">
                    {"Heaven for learning"}
                  </span>
                </div>
              </Link>
              <PanelRight className="ml-auto" onClick={toggleSidebar} />
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

                      <CollapsibleContent className="ml-2 mt-1 space-y-1">
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
        <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
          {session.data?.user &&
            !userSubscription &&
            !isGetSubscriptionLoading && (
              <SidebarMenu className="">
                <SidebarMenuItem className="">
                  <div className="w-full bg-accent p-4 rounded-xl max-w-sm">
                    <div>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                          Upgrade to Pro
                        </h2>
                        <p className="text-sm">Go for unlimited access.</p>
                      </div>
                    </div>

                    <Button
                      variant={"primary"}
                      className="cursor-pointer w-full"
                      asChild
                    >
                      <Link href="/pricing">
                        <Sparkles />
                        Upgrade
                      </Link>
                    </Button>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
        </SidebarGroup>
        {!open && !isMobile && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setOpen(true)}
                tooltip={"Open sidebar ctrl+b"}
              >
                <PanelRight />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <UserFeedback email={session.data?.user?.email} />
          </SidebarMenuItem>
          {session.isPending ? (
            <Skeleton className="w-full h-10" />
          ) : session.data?.user ? (
            <NavUser
              avatar={session.data.user.image}
              name={session.data.user.name}
              email={session.data.user.email}
            />
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive
                className="font-semibold"
                asChild
                tooltip={"login"}
              >
                <Link href={"/sign-in"}>
                  <LogIn />
                  <span className="">Login</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
