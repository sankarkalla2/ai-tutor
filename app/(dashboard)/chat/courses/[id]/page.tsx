import ChatWithCourseView from "@/modules/chat-with-course/ui/views/chat-course-view";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ChatWithCourse = () => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-all-user-courses"],
    queryFn: async () => await getAllUserCourses(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatWithCourseView />
    </HydrationBoundary>
  );
};

export default ChatWithCourse;
