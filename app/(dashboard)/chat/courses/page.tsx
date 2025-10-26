import ChatCoursesPagesView from "@/modules/chat-with-course/ui/views/chat-with-course-page";
import { Suspense } from "react";

const ChatCourses = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatCoursesPagesView />
    </Suspense>
  );
};

export default ChatCourses;
