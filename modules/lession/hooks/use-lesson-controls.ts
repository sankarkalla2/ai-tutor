import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { toggleLessionStatus } from "../server/lesson";
import { toast } from "sonner";

export const useLessonControls = (lessonId: string, courseId: string) => {
  const [open, setOpen] = useState();
  const queryClient = useQueryClient();

  const { mutate: toggleLession, isPending } = useMutation({
    mutationFn: () => toggleLessionStatus(lessonId),
    onMutate: async () => {
      console.log("muat");
      await queryClient.cancelQueries({
        queryKey: ["get-course-preview", courseId],
      });
      await queryClient.cancelQueries({
        queryKey: ["get-lesson-by-id", lessonId],
      });

      // Get previous data for rollback
      const prevLessonData = queryClient.getQueryData([
        "get-lesson-by-id",
        lessonId,
      ]);
      const prevCoursePreview = queryClient.getQueryData([
        "get-course-preview",
        courseId,
      ]);

      queryClient.setQueriesData(
        { queryKey: ["get-course-preview", courseId] },
        (oldData: any) => ({
          ...oldData,
          course: {
            ...oldData.course,
            modules: oldData.course.modules.map((module: any) => ({
              ...module,
              lession: module.lessons.map((lession: any) => {
                if (lession.id === lessonId) {
                  console.log(lession);
                  return {
                    ...lession,
                    status:
                      lession.status === "COMPLETED"
                        ? "GENERATED"
                        : "COMPLETED",
                  };
                }
                return lession;
              }),
            })),
          },
        })
      );

      //     // Optimistic update: lesson details
      queryClient.setQueryData(
        ["get-lesson-by-id", lessonId],
        (oldData: any) => ({
          ...oldData,
          lesson: {
            ...oldData.lesson,
            status:
              oldData?.lesson?.status === "COMPLETED"
                ? "GENERATED"
                : "COMPLETED",
          },
        })
      );

      // return { prevLessonData, prevCoursePreview };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-course-preview", courseId],
      });
    },
    onSuccess: async (data) => {
      if (data.status !== 200) {
        return toast.error(data.message);
      }
    },
  });

  

  return {
    open,
    setOpen,
    toggleLession,
    isPending,
    
  }
};
