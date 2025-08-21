"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Eye } from "lucide-react";
import { experimental_useObject } from "@ai-sdk/react";
import z from "zod";

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface UserAnswer {
  questionId: string;
  selectedOption: number | null;
}

type QuizMode = "taking" | "results" | "review";

interface QuizPageProps {
  lessonId: string;
}

export default function QuizPage({ lessonId }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { object, submit, isLoading } = experimental_useObject({
    api: `/api/lessons/${lessonId}/quiz`,
    schema: z.object({
      quiz: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()).min(2).max(5),
          answer: z.string(),
          id: z.string(),
        })
      ),
    }),
  });

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mode, setMode] = useState<QuizMode>("taking");

  if (isLoading) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Loading quiz...
      </div>
    );
  }

  if (!object?.quiz) {
    return (
      <Button
        onClick={() => submit({})}
        disabled={isLoading}
        size="sm"
        className="text-sm"
      >
        Start Quiz
      </Button>
    );
  }

  const questions = object.quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    const existingAnswerIndex = userAnswers.findIndex(
      (answer) => answer.questionId === currentQuestion?.id
    );

    const newAnswer: UserAnswer = {
      questionId: currentQuestion?.id || "",
      selectedOption,
    };

    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      setUserAnswers(updatedAnswers);
    } else {
      setUserAnswers([...userAnswers, newAnswer]);
    }

    if (isLastQuestion) {
      setMode("results");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      setMode("results");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = userAnswers.find(
        (answer) =>
          answer.questionId === questions[currentQuestionIndex - 1]?.id
      );
      setSelectedOption(previousAnswer?.selectedOption || null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((answer) => {
      const question = questions.find((q) => q?.id === answer.questionId);
      if (
        question &&
        Array.isArray(question.options) &&
        answer.selectedOption !== null &&
        question.options[answer.selectedOption] === question.answer
      ) {
        correct++;
      }
    });
    return correct;
  };

  const retakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setMode("taking");
  };

  const reviewQuiz = () => {
    setCurrentQuestionIndex(0);
    setMode("review");
    const firstAnswer = userAnswers.find(
      (answer) => answer.questionId === questions[0]?.id
    );
    setSelectedOption(firstAnswer?.selectedOption || null);
  };

  const handleReviewNavigation = (direction: "next" | "prev") => {
    const newIndex =
      direction === "next"
        ? Math.min(currentQuestionIndex + 1, questions.length - 1)
        : Math.max(currentQuestionIndex - 1, 0);

    setCurrentQuestionIndex(newIndex);
    const answer = userAnswers.find(
      (answer) => answer.questionId === questions[newIndex]?.id
    );
    setSelectedOption(answer?.selectedOption || null);
  };

  const backToResults = () => {
    setMode("results");
  };

  if (mode === "results") {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="flex  p-4">
        <Card className="max-w-xl w-full" variant="accent">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">
              Quiz Complete!
            </CardTitle>
            <CardDescription className="text-sm">Your Results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-muted-foreground">
                You scored {percentage}%
              </div>
            </div>

            <Progress value={percentage} className="w-full h-2" />

            <div className="text-center text-xs text-muted-foreground">
              {percentage >= 80
                ? "Excellent work! 🎉"
                : percentage >= 60
                ? "Good job! 👍"
                : "Keep practicing! 💪"}
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                onClick={retakeQuiz}
                size="sm"
                className="flex items-center gap-1 text-sm"
              >
                <RotateCcw className="w-3 h-3" />
                Retake
              </Button>
              <Button
                onClick={reviewQuiz}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-transparent text-sm"
              >
                <Eye className="w-3 h-3" />
                Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "review") {
    const userAnswer = userAnswers.find(
      (answer) => answer.questionId === currentQuestion?.id
    );
    const isCorrect =
      userAnswer?.selectedOption !== null &&
      userAnswer?.selectedOption !== undefined &&
      currentQuestion?.options?.[userAnswer.selectedOption] ===
        currentQuestion?.answer;
    const wasSkipped = userAnswer?.selectedOption === null;

    return (
      <div className="flex ">
        <Card className="max-w-2xl w-full" variant="accent">
          <CardHeader>
            <div className="flex justify-between items-center gap-x-2">
              <CardTitle className="text-base">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <Badge
                variant={
                  isCorrect
                    ? "success"
                    : wasSkipped
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs"
              >
                {wasSkipped ? "Skipped" : isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </div>
            <Button
              onClick={backToResults}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              ← Back to Results
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-lg font-medium">{currentQuestion?.question}</h2>

            <div className="space-y-2">
              {currentQuestion?.options?.map((option, index) => {
                const isUserAnswer = userAnswer?.selectedOption === index;
                const isCorrectAnswer = option === currentQuestion.answer;

                return (
                  <div
                    key={index}
                    className={`p-3 rounded-md border flex items-center justify-between text-sm ${
                      isCorrectAnswer
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : isUserAnswer && !isCorrectAnswer
                        ? "border-red-500 bg-red-50 dark:bg-red-950"
                        : "border-border"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    <div className="flex items-center gap-1">
                      {isUserAnswer && (
                        <Badge
                          variant="outline"
                          size="sm"
                          shape="circle"
                          className="truncate"
                        >
                          Your Answer
                        </Badge>
                      )}
                      {isCorrectAnswer && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      {isUserAnswer && !isCorrectAnswer && (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => handleReviewNavigation("prev")}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Previous
              </Button>
              <Button
                onClick={() => handleReviewNavigation("next")}
                disabled={currentQuestionIndex === questions.length - 1}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex">
      <Card className="max-w-2xl w-full" variant="accent">
        <CardHeader>
          <CardTitle className="text-base">
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-lg font-medium">{currentQuestion?.question}</h2>

          <div className="space-y-2">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-3 text-left rounded-md border text-sm transition-colors hover:bg-accent ${
                  selectedOption === index
                    ? "border-primary bg-primary/10"
                    : "border-border"
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleSkip}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
                size="sm"
                className="text-xs"
              >
                {isLastQuestion ? "Finish Quiz" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
