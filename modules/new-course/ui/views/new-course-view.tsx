"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PanelRight, Sparkles } from "lucide-react";

import { useCreateCourse } from "../../hooks/use-create-course";
import AiQuestionsChat from "../components/ai-questions-chat";
import Loader from "@/components/loader";
import { Textarea } from "@/components/ui/textarea";
import GetUserCourses from "@/components/courses/get-user-courses";
import { useSidebar } from "@/components/ui/sidebar";
import { getUserActiveSubscription } from "@/app/server/user";
import { useQuery } from "@tanstack/react-query";

export const NewCoursePageView = () => {
  const {
    topic,
    setTopic,
    selectedFormat,
    setSelectedFormat,
    enableQuestions,
    setEnableQuestions,
    handleCreateCourse,
    formats,
    questions,
    disableCheckbox,
    setDisableCheckbox,
    setQuestions,
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
    isGetSubscriptionLoading,
    userSubscription,
  } = useCreateCourse();

  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen mx-auto p-4 md:px-8 space-y-8">
      {isMobile && (
        <Button className="" variant={"outline"} onClick={toggleSidebar}>
          <PanelRight />
        </Button>
      )}
      {isPending && <Loader />}
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="secondary" className="text-xs">
              2 of 2 courses
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="ml-4 bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
            >
              Need more? Upgrade
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            What can I help you learn?
          </h1>
          <p className="text-gray-600">
            Enter a topic below to generate a personalized course for it
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium  mb-2">
                  What can I help you learn?
                </label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic"
                  disabled={isGetSubscriptionLoading || isLoading}
                  className=""
                  required
                />
              </div>
              {/* 
              <div>
                <label className="block text-sm font-medium mb-3">
                  Choose the format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.id}
                        type="button"
                        onClick={() => setSelectedFormat(format.id)}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          selectedFormat === format.id
                            ? "border-blue-500 bg-background"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2 " />
                        <div className="font-medium">{format.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div> */}
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={enableQuestions}
                  disabled={disableCheckbox}
                  onCheckedChange={async (checked) => {
                    if (!topic) return;
                    if (!userSubscription)
                      return toast.error(
                        "Please upgrade to get unlimted access"
                      );
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
