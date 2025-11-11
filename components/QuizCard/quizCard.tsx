import { QuizCardInterface } from "@/interfaces/quizCardInterface";
import { Circle, CircleDot } from "lucide-react";
import { useState } from "react";
export default function QuestionCard({ quizCard }: { quizCard: QuizCardInterface }) {
    const [selected, setSelected] = useState<number | null>(null);
    function handleClick(index: number) {
        setSelected(index);
    }
    return (
        <div className="w-full">
            <h1 className="text-xl">{quizCard.questionText}</h1>
            <div className="flex flex-col gap-3 w-full mt-4">
                {
                    quizCard.options.map((option: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer 
            ${selected === index
                                    ? "bg-white-600 text-white"        // selected style
                                    : "bg-white/20 hover:bg-white/30 text-white"
                                }`}
                        >
                            <div className="flex flex-row">
                                {selected != index ? <Circle size={20} className="text-white-400" /> : <CircleDot size={20} className="text-white-400"/>}
                                <span id={option} className="ml-6 text-white text-left">{option}</span>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}