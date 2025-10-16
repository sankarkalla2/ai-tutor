import { experimental_useObject } from "@ai-sdk/react";
import { useState } from "react";
import z from "zod";

interface UserAnswer {
  questionId: string;
  selectedOption: number | null;
}

type QuizMode = "taking" | "results" | "review";
export const useLessonQuiz = (lessonId: string) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [mode, setMode] = useState<QuizMode>("taking");

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

  const questions = object?.quiz || [];
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

  return {
    currentQuestionIndex,
    userAnswers,
    selectedOption,
    mode,
    object,
    submit,
    isLoading,
    questions,
    currentQuestion,
    isLastQuestion,
    handleNext,
    handleOptionSelect,
    handlePrevious,
    handleReviewNavigation,
    handleSkip,
    calculateScore,
    retakeQuiz,
    reviewQuiz,
    backToResults,
  };
};
