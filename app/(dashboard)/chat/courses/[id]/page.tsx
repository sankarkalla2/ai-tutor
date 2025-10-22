import ChatWithCourseView from "@/modules/chat-with-course/ui/views/chat-course-view";
import { getUserCourses } from "@/server/courses";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ChatWithCourse = () => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: async () => await getUserCourses(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatWithCourseView />
    </HydrationBoundary>
  );
};

export default ChatWithCourse;
