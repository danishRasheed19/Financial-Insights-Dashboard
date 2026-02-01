"use client";
import AnimatedCandles from "@/components/AnimatedCandles";
import { useState, useEffect } from "react";
import { QuizCardInterface } from "@/interfaces/quizCardInterface";
import { ArrowLeft, ArrowRight, Circle, CircleDot } from "lucide-react";
import { getQuizQuestions,submitQuizAnswers } from "@/apis/getQuiz";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<QuizCardInterface | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; selected: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router =useRouter();

  // Fetch questions from API on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await getQuizQuestions();
        console.log("res",res.questions);
        setQuizQuestions(res.questions);
      } catch (err) {   
        setError("Failed to load quiz questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Convert API question to QuizCardInterface
  function setQuestionCard(questionNo: number): QuizCardInterface {
    const q = quizQuestions.find(q => q.id === questionNo);
    if (!q) throw new Error("Question not found");
    const optionTexts = q.options.map((opt: any) => opt.text);
    return {
      id: q.id,
      questionText: q.question,
      options: optionTexts
    };
  }

  function handleQuestionClick(index: number) {
    setSelected(index);
  }

  function handleNextClick(questionId: number, selected: any) {
    setSelected(null);
    if (question != null) {
      setQuestion(setQuestionCard(question.id + 1));
    }
    setAnswers(prev => {
      const existing = prev.find(ans => ans.questionId === questionId);
      if (existing) {
        return prev.map(ans =>
          ans.questionId === questionId ? { ...ans, selected: selected } : ans
        );
      }
      return [...prev, { questionId: questionId, selected: selected }];
    });
  }

  async function handleSubmit(questionId: number, selected: number) {
  // Update local state first
  setAnswers(prev => {
    const existing = prev.find(ans => ans.questionId === questionId);
    if (existing) {
      return prev.map(ans =>
        ans.questionId === questionId ? { ...ans, selected } : ans
      );
    }
    return [...prev, { questionId, selected }];
  });

  try {
    // Convert answers array to object: { questionId: selected }
    const answersObj = Object.fromEntries(
      [...answers, { questionId, selected }].map(ans => [ans.questionId, ans.selected])
    );

    const payload = {
      user_id: localStorage.getItem("user_id") || "temp_user",
      answers: answersObj,
    };

    const response = await submitQuizAnswers(payload);
    console.log("Quiz submitted successfully:", response.data);

    router.push("/dashboard");
  } catch (err: any) {
    console.error("Error submitting quiz:", err);
  }
}

  // Render loading/error
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white text-xl">
        Loading quiz...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <AnimatedCandles fullScreen={true} />

      {/* Initial screen */}
      {!question && (
        <div className="flex flex-col items-center justify-center text-center relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
          <h1 className="text-2xl font-bold mb-4">Please take the quiz to proceed</h1>
          <h3 className="text-xl font-bold mb-4">Let's get to know your financial Personality!</h3>
          <button
            onClick={() => setQuestion(setQuestionCard(1))}
            className="w-1/4 py-2 bg-white/20 hover:bg-white/30 transition-all rounded-lg font-semibold shadow-lg cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      )}

      {/* Quiz card */}
      {question && (
        <div className="flex flex-col items-center justify-center text-center relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
          <div className="w-full">
            <h1 className="text-xl">{question.questionText}</h1>
            <div className="flex flex-col gap-3 w-full mt-4">
              {question.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer 
                    ${selected === index
                      ? "bg-white/60 text-black" // selected style
                      : "bg-white/20 hover:bg-white/30 text-white"
                    }`}
                >
                  <div className="flex flex-row items-center">
                    {selected !== index ? <Circle size={20} className="text-white/50" /> : <CircleDot size={20} className="text-white/50" />}
                    <span className="ml-4 text-left">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between w-full mt-6">
            <button
              onClick={() => setQuestion(setQuestionCard(question.id - 1))}
              disabled={question.id === 1}
              className={`bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center
                ${question.id === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30 cursor-pointer"}`}
            >
              <ArrowLeft size={18} />
            </button>

            {question.id !== quizQuestions.length ? (
              <button
                onClick={() => handleNextClick(question.id, selected)}
                disabled={selected === null}
                className={`bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center
                  ${selected === null ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30 cursor-pointer"}`}
              >
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => handleSubmit(question.id, selected)}
                disabled={selected === null}
                className={`bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center
                  ${selected === null ? "opacity-40 cursor-not-allowed" : "hover:bg-white/30 cursor-pointer"}`}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
