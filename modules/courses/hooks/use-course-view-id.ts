import { useQuery } from "@tanstack/react-query";

import { getCoursePreiview } from "../server/courses";

export const useCourseViewId = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-course-preview", id],
    queryFn: () => getCoursePreiview(id),
  });

  const totalLessons =
    data?.course?.modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
    ) || 0;
  const completedLessons =
    data?.course?.modules.reduce(
      (acc, module) =>
        acc +
        module.lessons.filter((lesson) => lesson.status === "COMPLETED").length,
      0
    ) || 0;
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );
  return {
    data,
    isLoading,
    isError,
    totalLessons,
    completedLessons,
    progressPercentage,
  };
};
