import { getCoursePreiview } from "@/modules/courses/server/courses";
import { getLessionById } from "@/modules/lession/server/lesson";
import LessonView from "@/modules/lession/ui/views/lession-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface LessonPageIdProps {
  params: Promise<{
    lessonId: string;
    id: string;
  }>;
}
const LessionPageId = async({ params }: LessonPageIdProps) => {

  const { lessonId, id } = await params;
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-lesson-by-id", lessonId],
    queryFn: async () => await getLessionById(lessonId, id),
  });

  void queryClient.prefetchQuery({
    queryKey: ["get-course-preview", id],
    queryFn: () => getCoursePreiview(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonView />
    </HydrationBoundary>
  );
};

export default LessionPageId;
