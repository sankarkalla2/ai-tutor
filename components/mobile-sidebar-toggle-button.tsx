"use client";

import { PanelRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export const MobileSidebarToggleButton = () => {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <>
      {isMobile && (
        <div className="p-4">
          <Button className="" variant={"outline"} onClick={toggleSidebar}>
            <PanelRight />
          </Button>
        </div>
      )}
    </>
  );
};
