"use client";

import type React from "react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { useCreateCourse } from "../../hooks/use-create-course";
import AiQuestionsChat from "../components/ai-questions-chat";
import Loader from "@/components/loader";
import GetUserCourses from "@/components/courses/get-user-courses";

export const NewCoursePageView = () => {
  const {
    topic,
    setTopic,
    selectedFormat,
    enableQuestions,
    setEnableQuestions,
    handleCreateCourse,
    questions,
    disableCheckbox,
    isLoading,
    generateQuestionsByTopic,
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
  } = useCreateCourse();

  return (
    <div className="min-h-screen mx-auto p-4 md:px-8 space-y-8">
      {isPending && <Loader />}
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            What can I help you learn?
          </h1>
          <p className="text-gray-600">
            Enter a topic below to generate a personalized course for it
          </p>
        </div>

        <Card className="mb-6 bg-accent">
          <CardContent className="p-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium  mb-2">
                  What can I help you learn?
                </label>
                <Textarea
                  variant={"lg"}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={enableQuestions}
                  disabled={disableCheckbox}
                  onCheckedChange={async (checked) => {
                    if (!topic) return;
                    if (!userSubscription) return;
                    if (checked && !questions.length) {
                      toast.message(
                        "You can answer questions to improve course efficiency"
                      );

                      await generateQuestionsByTopic(topic);
                    }
                  }}
                  id="terms"
                  className="border border-gray-300"
                  onClick={() => {
                    if (!topic) {
                      toast.error("Please enter a topic");
                      return;
                    }
                    if (!userSubscription)
                      return toast.error(
                        "Please upgrade to get unlimted access"
                      );

                    setEnableQuestions(!enableQuestions);
                  }}
                />
                <Label htmlFor="terms">
                  Answer questions for more effieciency in course
                </Label>
              </div>

              <div>
                {enableQuestions && (
                  <AiQuestionsChat
                    questions={questions}
                    isLoading={isLoading}
                    messages={messages}
                    setMessages={setMessages}
                    input={input}
                    setInput={setInput}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    isComplete={isComplete}
                    setIsComplete={setIsComplete}
                  />
                )}
              </div>

              <Button
                className="w-full"
                disabled={!topic || isLoading || !selectedFormat}
                onClick={handleCreateCourse}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 leading-relaxed">
          Your Courses
        </h2>
        <GetUserCourses />
      </div>
    </div>
  );
};
