"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  LogIn,
  MessagesSquare,
  PanelRight,
  Plus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserActiveSubscription } from "@/server/user";
import UpgradeCard from "../upgrade-card";
import UserFeedback from "../user-feedback";
import { useIsMobile } from "@/hooks/use-mobile";

const sidebarItems = [
  {
    title: "My Courses",
    url: "/courses",
    icon: BookOpen,
    tooltip: "My Courses",
  },
  {
    title: "Chat With Course",
    url: "/chat/courses",
    icon: MessagesSquare,
    tooltip: "Create New Course",
  },
  {
    title: 'Ask Tutor',
    url: '/chat/tutor',
    icon: Bot,
    tooltip: 'Ask Tutor'
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession();
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();
  const { data: userSubscription, isLoading: isGetSubscriptionLoading } =
    useQuery({
      queryKey: ["get-user-subscription"],
      queryFn: () => getUserActiveSubscription(),
    });
  const isMobile = useIsMobile();

  return (
    <Sidebar collapsible="icon" {...props} variant='sidebar'>
      <SidebarHeader>
        <SidebarMenuButton size={"lg"}>
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <BookOpen className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{"AI Tutor"}</span>
            <span className="truncate text-xs">{"Heaven for learning"}</span>
          </div>
          <PanelRight className="ml-auto" onClick={toggleSidebar} />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={"/new"}>
                  <Plus />
                  Create New
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.tooltip}
                  isActive={pathname.startsWith(item.url)}
                >
                  <Link href={item.url}>
                    <item.icon />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden p-0">
          {session.data?.user &&
            !userSubscription &&
            !isGetSubscriptionLoading && (
              <SidebarMenu className="">
                <SidebarMenuItem className="">
                  <UpgradeCard />
                </SidebarMenuItem>
              </SidebarMenu>
            )}
        </SidebarGroup>
        {!open && !isMobile && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleSidebar}
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
      <SidebarRail />
    </Sidebar>
  );
}
