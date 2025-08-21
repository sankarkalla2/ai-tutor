"use client";

import * as React from "react";
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LogIn,
  Map,
  MessagesSquare,
  PanelLeft,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
  StarIcon,
  StarsIcon,
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
import { TeamSwitcher } from "./theme-switcher";
import { NavUser } from "./nav-user";
import { NavProjects } from "./nav-projects";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { tool } from "ai";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserActiveSubscription } from "@/app/server/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { RippleButton } from "../animate-ui/buttons/ripple";
import UpgradeCard from "../upgrade-card";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const sidebarItems = [
  {
    title: "Chat With Course",
    url: "/chat",
    icon: MessagesSquare,
    tooltip: "Create New Course",
  },
  {
    title: "My Courses",
    url: "/courses",
    icon: BookOpen,
    tooltip: "My Courses",
  },
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
                  isActive={pathname.includes(item.url)}
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
              <SidebarMenu className="p-0">
                <UpgradeCard />
              </SidebarMenu>
            )}
        </SidebarGroup>
        {!open && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={"Toggle Sidebar"}
                onClick={toggleSidebar}
              >
                <PanelLeft />
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
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
