import {
  BookOpen,
  Clock,
  ExternalLinkIcon,
  MessageCircleIcon,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "../ui/item";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { TooltipProvider } from "../tooltip-provider";

interface CourseItemProps {
  id: string;
  progress: number;
  modules: number;
  totalLessons: number;
  title: string;
  description: string;
}
const CourseItem = ({
  progress,
  modules,
  totalLessons,
  description,
  title,
  id,
}: CourseItemProps) => {
  return (
    <div>
      <Item variant={"outline"}>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
          <div className="space-y-2 w-full pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{modules} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalLessons} lessons</span>
              </div>
              <Badge
                variant={progress >= 50 ? "success" : "warning"}
                className="text-xs"
                appearance={"outline"}
              >
                {progress}% complete
              </Badge>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <Button asChild size="sm" className="flex-1" variant={"mono"}>
                <Link href={`/course/${id}`} prefetch>
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  View Course
                </Link>
              </Button>

              <TooltipProvider
                trigger={
                  <Button size="icon" variant={"outline"}>
                    <Link href={`/chat/courses/${id}`} prefetch>
                      <MessageCircleIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                }
              >
                <p>Open in chat</p>
              </TooltipProvider>
            </div>
          </div>
        </ItemContent>
      </Item>
    </div>
  );
};

export default CourseItem;
