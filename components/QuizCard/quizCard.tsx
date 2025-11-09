import { QuizCardInterface } from "@/interfaces/quizCardInterface";
import {Circle,CircleDot} from "lucide-react";
export default function QuestionCard({ quizCard }: { quizCard: QuizCardInterface }) {
    return (
        <div className="w-full">
            <h1 className="text-xl">{quizCard.questionText}</h1>
            <div className="flex flex-col gap-3 w-full mt-4">
                {
                    quizCard.options.map((option: string, score: number) => (
                        <button
                            key={score}
                            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex flex-row">
                            <Circle size={20} className="text-white-400" />
                            <span className="ml-6 text-white text-left">{option}</span>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}