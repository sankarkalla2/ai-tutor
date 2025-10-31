"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
  Zap,
} from "lucide-react";

import Spinner from "../spinner";
import { getUserActiveSubscription } from "@/server/user";
import { ModalProvider } from "../modal-provider";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavUserProps {
  name: string;
  email: string;
  avatar: string | undefined | null;
}
export function NavUser({ name, email, avatar }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();
  const [userName, setUserName] = useState(name);
  const [imgUrl] = useState("");
  const [_, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { data: userSubscription, isLoading } = useQuery({
    queryKey: ["get-user-subscription"],
    queryFn: () => getUserActiveSubscription(),
  });

  const handleProfileUdate = async () => {
    if (!userName && !imgUrl.length) return;
    setIsPending(true);
    const res = await authClient.updateUser({
      name: userName,
    });
    if (res.data?.status) {
      toast.success("Profile Updated");
    } else {
      console.log("something went wront");
      toast.error(res.error?.message);
    }

    setIsPending(false);
    setOpen(false);
  };

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            isActive
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
                  readOnly
                />
              </div>

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
                    <>
                      <Item variant={"muted"}>
                        <ItemMedia variant="icon">
                          <CreditCard />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>Subscription Status</ItemTitle>
                          <ItemDescription>Current Plan</ItemDescription>
                        </ItemContent>
                        <ItemActions className="flex">
                          <Badge
                            size={"sm"}
                            variant={userSubscription ? "success" : "warning"}
                            appearance={"outline"}
                          >
                            {userSubscription ? "Pro plan" : "No Subscription"}
                          </Badge>
                          {userSubscription ? (
                            <Button
                              size={"sm"}
                              onClick={() => authClient.customer.portal()}
                            >
                              <Settings />
                              Manage Billing
                            </Button>
                          ) : (
                            <Button asChild size={"sm"} variant={"primary"}>
                              <Link href={"/pricing"}>
                                <Zap />
                                Pricing
                              </Link>
                            </Button>
                          )}
                        </ItemActions>
                      </Item>
                    </>
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
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in");
                    },
                  },
                });
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
