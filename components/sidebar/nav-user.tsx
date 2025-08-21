"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  TriangleAlert,
  User,
  User2Icon,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import { ModalProvider } from "../modal-provider";
import { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserActiveSubscription,
  updateUserProfile,
} from "@/app/server/user";
import Spinner from "../spinner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { username } from "better-auth/plugins";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";

interface NavUserProps {
  name: string;
  email: string;
  avatar: string | undefined | null;
}
export function NavUser({ name, email, avatar }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { data: userSubscription, isLoading } = useQuery({
    queryKey: ["get-user-subscription"],
    queryFn: () => getUserActiveSubscription(),
  });
  const [userName, setUserName] = useState(name);
  const [imgUrl, setImgUrl] = useState("");
  const queryClient = new QueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      userName: name,
      imgUrl,
    }: {
      userName: string;
      imgUrl: string;
    }) => updateUserProfile(name, imgUrl),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
      } else toast.error(data.message);
      setOpen(false);
    },
  });

  const handleProfileUdate = async () => {
    if (!username && !imgUrl.length) return;
    const res = await authClient.updateUser({
      ...(name && { name: userName }),
      ...(imgUrl && { image: imgUrl }),
    });
    if (res.data?.status) {
      toast.success("Profile Updated");
    } else {
      toast.error(res.error?.message);
    }

    setOpen(false);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar || ""} alt={"CN"} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar || ""} alt={name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <ModalProvider
              trigger={
                <button
                  className="flex w-full items-center rounded-md gap-2 cursor-pointer hover:bg-sidebar-accent px-2 py-2 text-sm"
                  onClick={() => setOpen(true)}
                >
                  <User className="size-4 text-muted-foreground" /> Profile
                </button>
              }
              title={"Profile"}
              description="Manage your Profile"
              onOpenChange={() => setOpen(false)}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 items-center w-full">
                  <Label className="text-sm col-span-3">Name</Label>
                  <Input
                    type="text"
                    value={userName}
                    className="col-span-9"
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <Label className="text-sm col-span-3">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    className="col-span-9"
                    disabled
                  />
                </div>
                <Separator />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={handleProfileUdate}
                    disabled={isPending}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </div>
            </ModalProvider>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild></DropdownMenuItem>
              <ModalProvider
                trigger={
                  <div className="flex items-center gap-2 rounded-md cursor-pointer hover:bg-sidebar-accent px-2 py-2 text-sm">
                    <CreditCard className="size-4 text-muted-foreground" />
                    Billing
                  </div>
                }
                title="Billing"
                description="Manage Billing"
              >
                <div>
                  <div>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <Alert>
                        <AlertTitle>
                          <div className="flex items-center gap-2">
                            <CreditCard /> Subscription Status
                          </div>
                        </AlertTitle>
                        <AlertDescription className="w-full mt-5">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Current Plan
                              </p>
                              <p className="text-lg font-semibold flex items-center gap-2">
                                {userSubscription ? "Pro" : "Free"}
                                {userSubscription && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                  >
                                    Active
                                  </Badge>
                                )}
                                {!userSubscription && (
                                  <Badge variant="outline">
                                    No Subscription
                                  </Badge>
                                )}
                              </p>
                            </div>

                            {!userSubscription && (
                              <Button
                                className="bg-primary hover:bg-primary/90 "
                                asChild
                              >
                                <Link href="/pricing">
                                  <Zap className="mr-2 h-4 w-4" />
                                  View Pricing
                                </Link>
                              </Button>
                            )}
                            {userSubscription && (
                              <Button
                                className="bg-primary hover:bg-primary/90"
                                onClick={() => authClient.customer.portal()}
                              >
                                <>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Manage Billing
                                </>
                              </Button>
                            )}
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </ModalProvider>
              <DropdownMenuItem asChild></DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Palette className="h-4 w-4 mr-1" />
                  Themes
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor />
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem
                onClick={() => {
                  authClient.signOut();
                  window.location.reload();
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
