"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  errorMessage: string;
}
const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle className="text-destructive">
            Something went wrong
          </EmptyTitle>
          <EmptyDescription>{errorMessage}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => window.location.reload()} // Retry fetching
              variant="outline"
            >
              Retry
            </Button>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default ErrorPage;
