import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { KbdGroup, Kbd } from "@/components/ui/kbd";
import {
  X,
  Check,
  Edit,
  RotateCcw,
  MessageCircle,
  MessageCircleOff,
  Loader2,
  ChevronDown,
} from "lucide-react";

import { ModalProvider } from "@/components/modal-provider";

export const LessonActions = ({
  isLoading,
  isOpen,
  toggleOpen,
  generateLesson,
  toggleLesson,
  isPending,
  data,
  open,
  setOpen,
  regeneratePrompt,
  setRegeneratePrompt,
}: {
  isLoading: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
  generateLesson: (prompt?: string, fullRegen?: boolean) => void;
  toggleLesson: () => void;
  isPending: boolean;
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  regeneratePrompt: string;
  setRegeneratePrompt: (prompt: string) => void;
}) => {
  return (
    <div className="flex items-center justify-end w-full gap-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="primary"
            onClick={toggleOpen}
            disabled={isLoading}
            aria-label={isOpen ? "Close chat" : "Open chat"}
            appearance={"outline"}
            size={"md"}
          >
            {isOpen ? (
              <MessageCircleOff className="h-4 w-4" />
            ) : (
              <MessageCircle className="h-4 w-4" />
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            Toggle Chat{" "}
            <KbdGroup className="text-xs">
              <Kbd className="text-xs">Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isLoading}>
          <Badge
            size="md"
            aria-label="Edit lesson"
            appearance={"outline"}
            variant={"info"}
          >
            Edit
            <ChevronDown />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => generateLesson(undefined, true)}>
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </DropdownMenuItem>

          <ModalProvider
            open={open}
            onOpenChange={() => setOpen(false)}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <Edit className="h-4 w-4" />
                Modify Prompt
              </DropdownMenuItem>
            }
            title="Edit Lesson"
            description="Help AI to generate a lesson for you"
          >
            <Textarea
              placeholder="e.g., make sure to add section ..."
              value={regeneratePrompt}
              onChange={(e) => setRegeneratePrompt(e.target.value)}
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button
                onClick={() => generateLesson(regeneratePrompt)}
                disabled={!regeneratePrompt.trim()}
              >
                Submit
              </Button>
            </DialogFooter>
          </ModalProvider>
        </DropdownMenuContent>
      </DropdownMenu>

      <Badge
        appearance={"outline"}
        size={"md"}
        className="cursor-pointer"
        onClick={toggleLesson}
        variant={data?.lesson?.status === "COMPLETED" ? "warning" : "success"}
        disabled={isPending || isLoading}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Please wait.
          </>
        ) : data?.lesson?.status === "COMPLETED" ? (
          <>
            <X className="mr-1 h-3 w-3" /> Mark As Not Done
          </>
        ) : (
          <>
            <Check className="mr-1 h-3 w-3" /> Mark As Done
          </>
        )}
      </Badge>
    </div>
  );
};
