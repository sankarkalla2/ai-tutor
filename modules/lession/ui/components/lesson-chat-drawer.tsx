import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageSquare } from "lucide-react";

import { LessonViewChat } from "./chat-component";
interface LessonChatDrawerProps {
  open: boolean;
  onOpenchange: () => void;
}
const LessonChatDrawer = ({ open, onOpenchange }: LessonChatDrawerProps) => {
  const mobile = useIsMobile();
  return (
    <Drawer open={open && mobile} onOpenChange={onOpenchange}>
      <DrawerContent className="flex flex-col pb-4 h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>
            <MessageSquare /> Chat with lesson
          </DrawerTitle>
        </DrawerHeader>
        <LessonViewChat />
      </DrawerContent>
    </Drawer>
  );
};

export default LessonChatDrawer;
