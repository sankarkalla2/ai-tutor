import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { MobileSidebarToggleButton } from "@/components/mobile-sidebar-toggle-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full">
          <div className="p-4">
            <MobileSidebarToggleButton />
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
