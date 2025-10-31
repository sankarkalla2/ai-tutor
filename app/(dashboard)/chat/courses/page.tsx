import { useCoursesParams } from "@/hooks/use-courses-params";
import ChatCoursesPagesView from "@/modules/chat-with-course/ui/views/chat-with-course-page";
import { getAllUserCourses } from "@/modules/courses/server/courses";
import { redirectUnauthrizedUser } from "@/server/user";
import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const ChatCourses = async () => {
  await redirectUnauthrizedUser();

  const [params] = useCoursesParams();
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-user-courses-by-params", params],
    queryFn: async () => await getAllUserCourses(params),
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatCoursesPagesView />
    </Suspense>
  );
};

export default ChatCourses;
