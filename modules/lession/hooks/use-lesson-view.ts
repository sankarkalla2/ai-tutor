import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  getLessionById,
  toggleLessionStatus,
} from "@/modules/lession/server/lesson";

export const useLessonView = (lessonId: string, courseId: string) => {
  const [open, setOpen] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-lesson-by-id", lessonId],
    queryFn: async () => await getLessionById(lessonId, courseId),
  });

  // Auto-generate lesson if not yet generated
  useEffect(() => {
    if (data?.lesson?.status === "NOT_GENERATED") {
      generateLesson();
    }
  }, [data?.lesson?.status]);

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
  // const { mutate: toggleLession, isPending } = useMutation({
  //   mutationKey: ["toggle-lession-status", lessonId],
  //   mutationFn: async () => {
  //     console.log("mutationFn running with lessonId:", lessonId);
  //     return await toggleLessionStatus(lessonId);
  //   },
  //   onMutate: async () => {
  //     console.log("onMutate running");

  //     // Cancel ongoing queries so we don't overwrite optimistic updates
  //     await queryClient.cancelQueries({
  //       queryKey: ["get-lesson-by-id", lessonId],
  //     });
  //     await queryClient.cancelQueries({
  //       queryKey: ["get-course-preview", courseId],
  //     });

  //     // Get previous data for rollback
  //     const prevLessonData = queryClient.getQueryData([
  //       "get-lesson-by-id",
  //       lessonId,
  //     ]);
  //     const prevCoursePreview = queryClient.getQueryData([
  //       "get-course-preview",
  //       courseId,
  //     ]);

  //      // Optimistic update: course preview list
  //     queryClient.setQueryData(
  //       ["get-course-preview", courseId],
  //       (oldData: any) => ({
  //         ...oldData,
  //         course: {
  //           ...oldData.course,
  //           modules: oldData.course.modules.map((module: any) => ({
  //             ...module,
  //             lession: module.lessons?.map((lession: any) => {
  //               if (lession.id === lessonId) {
  //                 console.log(lession);
  //                 return {
  //                   ...lession,
  //                   status:
  //                     lession.status === "COMPLETED"
  //                       ? "GENERATED"
  //                       : "COMPLETED",
  //                 };
  //               }
  //               return lession;
  //             }),
  //           })),
  //         },
  //       })
  //     );

  //     // Optimistic update: lesson details
  //     queryClient.setQueryData(
  //       ["get-lesson-by-id", lessonId],
  //       (oldData: any) => ({
  //         ...oldData,
  //         lesson: {
  //           ...oldData.lesson,
  //           status:
  //             oldData?.lesson?.status === "COMPLETED"
  //               ? "GENERATED"
  //               : "COMPLETED",
  //         },
  //       })
  //     );

  //     // Pass rollback data to onError
  //     return { prevLessonData, prevCoursePreview };
  //   },
  //   onError: (err, _, context) => {
  //     console.error("Mutation failed, rolling back:", err);
  //     if (context?.prevLessonData) {
  //       queryClient.setQueryData(
  //         ["get-lesson-by-id", lessonId],
  //         context.prevLessonData
  //       );
  //     }
  //     if (context?.prevCoursePreview) {
  //       queryClient.setQueryData(
  //         ["get-course-preview", courseId],
  //         context.prevCoursePreview
  //       );
  //     }
  //     toast.error("Something went wrong while updating lesson status.");
  //   },
  //   onSuccess: (data) => {
  //     if (data.status !== 200) {
  //       toast.error(data.message);
  //     }
  //   },
  //   onSettled: () => {
  //     // Refetch latest data from server
  //     queryClient.invalidateQueries({
  //       queryKey: ["get-lesson-by-id", lessonId],
  //     });
  //     queryClient.invalidateQueries({
  //       queryKey: ["get-course-preview", courseId],
  //     });
  //   },
  // });

  const generateLesson = async (
    regeneratePrompt?: string,
    regenerate?: boolean
  ) => {
    setIsStreaming(true);
    setStreamingText("");

    let res = undefined;
    if (regenerate || regeneratePrompt) {
      res = await fetch(`/api/lessons/${lessonId}/generate`, {
        method: "POST",
        body: JSON.stringify({ regeneratePrompt, regenerate }),
      });
    } else {
      res = await fetch(`/api/lessons/${lessonId}/generate`);
    }
    if (!res.body) {
      setIsStreaming(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      let lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          setStreamingText(obj.lessonContent || "");
        } catch {
          // ignore parsing errors
        }
      }
    }

    queryClient.invalidateQueries({
      queryKey: ["get-course-preview", courseId],
    });
    setIsStreaming(false);
  };

  return {
    data,
    toggleLession,
    isLoading,
    isError,
    isPending,
    generateLesson,
    open,
    setOpen,
    streamingText,
    isStreaming,
  };
};
