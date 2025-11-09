"use client";
import AnimatedCandles from "@/components/AnimatedCandles";
import { useState } from "react";
import { QuizCardInterface } from "@/interfaces/quizCardInterface";
import QuestionCard from "@/components/QuizCard/quizCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

let quizQuestions = [
    {
        "id": 1,
        "question": "How do you feel about investing in volatile markets?",
        "options": [
            { "text": "Very anxious", "score": 0 },
            { "text": "Somewhat anxious", "score": 1 },
            { "text": "Neutral", "score": 2 },
            { "text": "Somewhat excited", "score": 3 },
            { "text": "Very excited", "score": 4 }
        ],
        "trait": "risk"
    },
    {
        "id": 2,
        "question": "Do you usually plan your monthly spending?",
        "options": [
            { "text": "Never", "score": 0 },
            { "text": "Rarely", "score": 1 },
            { "text": "Sometimes", "score": 2 },
            { "text": "Often", "score": 3 },
            { "text": "Always", "score": 4 }
        ],
        "trait": "planning"
    },
    {
        "id": 3,
        "question": "If you get a bonus, you’re more likely to...",
        "options": [
            { "text": "Spend it immediately", "score": 0 },
            { "text": "Spend most, save a bit", "score": 1 },
            { "text": "Split half-half", "score": 2 },
            { "text": "Save most, spend a bit", "score": 3 },
            { "text": "Save or invest it", "score": 4 }
        ],
        "trait": "spending"
    },
    {
        "id": 4,
        "question": "How often do you check your financial accounts?",
        "options": [
            { "text": "Rarely", "score": 0 },
            { "text": "Once a month", "score": 1 },
            { "text": "Once a week", "score": 2 },
            { "text": "A few times a week", "score": 3 },
            { "text": "Daily", "score": 4 }
        ],
        "trait": "awareness"
    },
    {
        "id": 5,
        "question": "When buying something big, do you compare options first?",
        "options": [
            { "text": "Never", "score": 0 },
            { "text": "Rarely", "score": 1 },
            { "text": "Sometimes", "score": 2 },
            { "text": "Often", "score": 3 },
            { "text": "Always", "score": 4 }
        ],
        "trait": "awareness"
    },
    {
        "id": 6,
        "question": "You see a sudden market dip. Do you...",
        "options": [
            { "text": "Sell quickly", "score": 0 },
            { "text": "Wait and see", "score": 1 },
            { "text": "Do nothing", "score": 2 },
            { "text": "Buy cautiously", "score": 3 },
            { "text": "Buy more confidently", "score": 4 }
        ],
        "trait": "risk"
    },
    {
        "id": 7,
        "question": "Your financial goal is...",
        "options": [
            { "text": "Enjoy life now", "score": 0 },
            { "text": "Balance fun and saving", "score": 1 },
            { "text": "Plan moderately", "score": 2 },
            { "text": "Focus on stability", "score": 3 },
            { "text": "Build for the future", "score": 4 }
        ],
        "trait": "planning"
    },
    {
        "id": 8,
        "question": "How do you track your expenses?",
        "options": [
            { "text": "Not at all", "score": 0 },
            { "text": "Occasionally", "score": 1 },
            { "text": "Manually sometimes", "score": 2 },
            { "text": "Use simple apps", "score": 3 },
            { "text": "Use detailed tools/sheets", "score": 4 }
        ],
        "trait": "awareness"
    }
]
function setQuestionCard(questionNo: number): QuizCardInterface {
    const q = quizQuestions.find(q => q.id === questionNo);
    if (!q) throw new Error("Question not found");
    const optionTexts = q.options.map(opt => opt.text);
    return {
        id: q.id,
        questionText: q.question,
        options: optionTexts
    }
}

export default function QuizPage() {
    const [question, setQuestion] = useState<QuizCardInterface | null>(null);
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
            <AnimatedCandles />
            {/*Quiz Card */}
            {!question && <div className="flex flex-col items-center justify-center text-center relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
                <h1 className="text-2xl font-bold mb-4">Please take the quiz to proceed</h1>
                <h3 className="text-xl font-bold mb-4">Let's get to know your financial Personality!</h3>
                <button onClick={() => setQuestion(setQuestionCard(1))} className=" w-1/4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-semibold shadow-lg cursor-pointer">Start Quiz</button>
            </div>}
            {
                question && <div className="flex flex-col items-center justify-center text-center relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
                    <QuestionCard quizCard={question} />
                    <div className="flex flex-row justify-between w-full mt-6">
                        <button
                            onClick={() => setQuestion(setQuestionCard(question.id -1 ))}
                            disabled={question.id === 1} // disable if it's the first question
                            className={`bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center
                                ${question.id === 1
                                    ? "opacity-40 cursor-not-allowed"  // visually disabled
                                    : "hover:bg-white/30 cursor-pointer"
                                }`}
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <button 
                        onClick={() => setQuestion(setQuestionCard(question.id + 1))}
                        className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-all duration-200 cursor-pointer">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}