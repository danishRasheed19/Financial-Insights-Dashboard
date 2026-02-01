"use client"
import { useState } from "react"
import axios from "axios"
import AnimatedCandles from "@/components/AnimatedCandles"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { register } from "@/apis/auth"
export default function SignUpPage() {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const data = await register({
        first_name,
        last_name,
        email,
        password,
      });

      const { access_token } = data;

      // Save token (e.g., localStorage or cookie)
      localStorage.setItem("token", access_token);

      // Redirect to dashboard or desired page
      router.push("/quiz");
    } catch (err: any) {
      // Handle error
      if (err.response) {
        // API responded with error status
        setError(err.response.data.detail || "Login failed");
      } else if (err.request) {
        // Request made but no response
        setError("No response from server. Try again later.");
      } else {
        // Something else went wrong
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Candles on right half */}
      <AnimatedCandles />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center px-12 space-y-6">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Build Your
            <span className="block text-white/80">Investor Profile</span>
          </h1>

          <p className="text-lg text-white/70 max-w-md">
            We analyze your personality, risk tolerance, and goals
            to create a portfolio that fits *you*.
          </p>

          <div className="flex gap-3">
            <Tag text="AI Driven" />
            <Tag text="Risk-Aware" />
            <Tag text="Long-Term" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-4">
          <div
            className="
              w-full max-w-md
              bg-white/10 backdrop-blur-2xl
              border border-white/20
              rounded-2xl
              p-8
              shadow-[0_20px_60px_rgba(255,255,255,0.12)]
            "
          >
            <h2 className="text-3xl font-bold text-white text-center">
              Create Account
            </h2>

            <p className="text-sm text-white/70 text-center mt-1">
              Start your personalized investing journey
            </p>

            <form onSubmit={(e) => {
              e.preventDefault()
              handleSignUp()
            }} className="mt-6 space-y-4">
              <div className="flex gap-4">
                <Input label="First Name" value={first_name} setValue={setFirstName} />
                <Input label="Last Name" value={last_name} setValue={setLastName} />
              </div>

              <Input label="Email" value={email} setValue={setEmail} type="email" />
              <Input label="Password" value={password} setValue={setPassword} type="password" />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full mt-4 py-2
                  bg-white text-black font-semibold
                  rounded-xl
                  transition-transform duration-200
                  hover:scale-[1.05]
                  active:scale-[0.98]
                  shadow-[0_8px_30px_rgba(255,255,255,0.35)]
                  cursor-pointer
                "
              >{loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign Up"
              )}
              </button>
            </form>

            <p className="text-center text-sm text-white/70 mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-white font-medium hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  setValue,
  type = "text",
}: {
  label: string
  value: string
  setValue: (v: string) => void
  type?: string
}) {
  return (
    <div className="flex-1">
      <label className="block text-sm text-white/80 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="
          w-full px-4 py-2 rounded-lg
          bg-white/10 border border-white/20
          text-white
          focus:outline-none focus:ring-2 focus:ring-white/40
        "
      />
    </div>
  )
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
      {text}
    </span>
  )
}
