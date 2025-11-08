"use client";
import AnimatedCandles from "@/components/AnimatedCandles";
export default function QuizPage(){
    return(
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
            <AnimatedCandles />
            {/*Quiz Card */}
            <div className="flex flex-col items-center justify-center text-center relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
                <h1 className="text-2xl font-bold mb-4">Please take the quiz to proceed</h1>
                <h3 className="text-xl font-bold mb-4">Let's get to know your financial Personality!</h3>
                <button className=" w-1/4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-semibold shadow-lg cursor-pointer">Start Quiz</button>
            </div>
        </div>
    )
}