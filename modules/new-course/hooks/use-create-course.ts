import { useChat } from "@ai-sdk/react";
import { BookOpen, FileText, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createCourseOverview,
  createQuestionsByTopic,
} from "../server/create-course";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserActiveSubscription } from "@/app/server/user";

type Format = "course" | "guide" | "roadmap";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  options?: string[]; // optional for multiple-choice questions
  answer?: string;
}
type FollowedQuestions = {
  questions?: {
    question: string;
    answer: string;
  }[];
};

export const useCreateCourse = () => {
  const [topic, setTopic] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<Format>("course");
  const [enableQuestions, setEnableQuestions] = useState(false);
  const [questions, setQuestions] = useState<QuestionsProps[]>([]);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const router = useRouter();
  const { data: userSubscription, isLoading: isGetSubscriptionLoading } =
    useQuery({
      queryKey: ["get-user-subscription"],
      queryFn: () => getUserActiveSubscription(),
    });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      topic,
      format,
      followedQuestions,
    }: {
      topic: string;
      format: Format;
      followedQuestions: FollowedQuestions;
    }) => {
      return await createCourseOverview(topic, format, followedQuestions);
    },

    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        return router.push(`/course/${data.id}`);
      }
      toast.error(data.message);
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  // Initialize with first question when questions are available
  useEffect(() => {
    if (!isLoading && questions.length > 0 && messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: questions[0].question,
          options: questions[0].options,
        },
      ]);
    }
  }, [questions, isLoading, messages.length]);

  const handleCreateCourse = async () => {
    if (!topic) {
      toast.error("Plase select the topic");
      return;
    }
    if (!userSubscription) {
      return toast.error("Please upgrade to get unlimted access");
    }
    setIsLoading(true);

    const assistantMessages = messages.filter(
      (messages) => messages.role === "assistant" && messages.answer !== ""
    );

    const followedQuestions = {
      questions: assistantMessages.map((message) => ({
        question: message.content,
        answer: message.answer || "",
      })),
    };

    mutate({ topic, format: "course", followedQuestions });
    setIsLoading(false);
  };

  const generateQuestionsByTopic = async (topic: string) => {
    setDisableCheckbox(true);
    setIsLoading(true);
    const generatedQuestions = await createQuestionsByTopic(
      selectedFormat,
      topic
    );

    setQuestions(generatedQuestions);
    setDisableCheckbox(false);
    setIsLoading(false);
  };

  const formats = [
    {
      id: "course" as Format,
      name: "Course",
      icon: BookOpen,
      description: "Structured learning path",
    },
    {
      id: "guide" as Format,
      name: "Guide",
      icon: FileText,
      description: "Step-by-step instructions",
    },
    {
      id: "roadmap" as Format,
      name: "Roadmap",
      icon: Map,
      description: "Learning progression map",
    },
  ];

  return {
    topic,
    setTopic,
    selectedFormat,
    setSelectedFormat,
    enableQuestions,
    setEnableQuestions,
    handleCreateCourse,
    formats,
    questions,
    setQuestions,
    disableCheckbox,
    setDisableCheckbox,
    generateQuestionsByTopic,
    isLoading,
    messages,
    setMessages,
    input,
    setInput,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    isComplete,
    setIsComplete,
    isPending,
    userSubscription,
    isGetSubscriptionLoading,
  };
};
