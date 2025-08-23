"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ErrorPageProps {
  errorMessage: string;
}
const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-xl font-semibold text-red-600">
        {"Something went wrong"}
      </h1>
      <p className="text-muted-foreground">{errorMessage}</p>
      <div className="flex gap-4">
        <Button
          onClick={() => window.location.reload()} // Retry fetching
          variant="outline"
        >
          Retry
        </Button>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
