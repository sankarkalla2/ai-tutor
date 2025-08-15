import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { LessonViewChat } from "./chat-component";

interface LessonChatDrawerProps {
  open: boolean;
  onOpenchange: () => void;
}
const LessonChatDrawer = ({ open, onOpenchange }: LessonChatDrawerProps) => {
  const mobile = useIsMobile();
  return (
    <Drawer open={open && mobile} onOpenChange={onOpenchange}>
      <DrawerContent className="h-[85vh] flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <LessonViewChat />

        {/* <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default LessonChatDrawer;
