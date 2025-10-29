import Link from "next/link";

import { FileQuestionIcon, PlusIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Button } from "../ui/button";

const NoCoursesFoundPage = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionIcon />
        </EmptyMedia>
        <EmptyTitle>No Courses Found</EmptyTitle>
        <EmptyDescription>
          No courses found. You can create a new one.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={"/new"} prefetch>
              <PlusIcon />
              Create New
            </Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

export default NoCoursesFoundPage;
