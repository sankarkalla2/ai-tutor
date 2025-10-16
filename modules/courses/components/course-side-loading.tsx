import Link from "next/link";

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
} from "@/components/ui/sidebar";
import { BookOpen, PanelRight } from "lucide-react";

export const CourseSidebarLoading = () => {
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
              <PanelRight className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>Course Content</SidebarGroupLabel>
            <SidebarGroupContent>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton className="h-6 w-full mb-2" />
                    {[...Array(4)].map((_, j) => (
                      <SidebarMenuSkeleton
                        showIcon
                        key={j}
                        className="h-6 w-full ml-4 mb-1"
                      />
                    ))}
                  </SidebarMenuItem>
                </div>
              ))}
            </SidebarGroupContent>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} isActive>
              <SidebarMenuSkeleton
                showIcon
                className="!h-12 w-full rounded-md"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
