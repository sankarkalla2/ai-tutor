import ChatWithCourseIdView from "@/modules/chat-with-course/ui/views/chat-with-course-view-id";
import { getUserCourses } from "@/server/courses";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ChatWithCourse = () => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-user-courses"],
    queryFn: async () => await getUserCourses(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatWithCourseIdView />
    </HydrationBoundary>
  );
};

export default ChatWithCourse;
