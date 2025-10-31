
import ChatCoursesPagesView from "@/modules/chat-with-course/ui/views/chat-with-course-page";
import { redirectUnauthrizedUser } from "@/server/user";
import { Suspense } from "react";

const ChatCourses = async () => {
  await redirectUnauthrizedUser();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatCoursesPagesView />
    </Suspense>
  );
};

export default ChatCourses;
