"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Chrome, Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedCandles from "@/components/AnimatedCandles"


function AnimatedLineChart() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-56">
      <motion.path
        d="M0,140 L50,120 L100,130 L150,90 L200,100 L250,70 L300,80 L350,40 L400,60"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  )
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    setLoading(true)
    setError("")

    setTimeout(() => {
      setLoading(false)
      setError("Invalid email or password")
    }, 2000)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-12 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white drop-shadow-lg"
        >
          Invest Smarter.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-white/70 max-w-md"
        >
          AI-powered stock recommendations aligned with your investment personality.
        </motion.p>

        {/* Animated Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
        >
          <AnimatedLineChart />
          <p className="text-sm text-white/60 text-center mt-2">
            Market momentum (illustrative)
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-6">
        <AnimatedCandles />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card
            className={`
              bg-white/10 backdrop-blur-2xl
              border rounded-2xl
              shadow-[0_20px_60px_rgba(255,255,255,0.12)]
              transition-all
              ${error ? "border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]" : "border-white/20"}
            `}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white">
                Welcome Back
              </CardTitle>
              <p className="text-sm text-white/70">
                Sign in to your dashboard
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-400 text-center">
                  {error}
                </p>
              )}

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-white text-black font-semibold rounded-xl transition-transform duration-200 hover:scale-[1.05] active:scale-[0.98] cursor-pointer hover:bg-white hover:text-black"
              >

                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-xs text-white/60">OR</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="text-black border-white/30 hover:scale-[1.05] active:scale-[0.98] cursor-pointer"
                >
                  <Chrome className="mr-2 h-4 w-4 text-black" />
                  Google
                </Button>

                <Button
                  variant="outline"
                  className="text-black border-white/30 hover:scale-[1.05] active:scale-[0.98] cursor-pointer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>

              {/* Personality Teaser */}
              <div className="flex justify-center gap-2 pt-4">
                <Badge className="bg-white/20 text-white hover:scale-110 transition">
                  Analytical
                </Badge>
                <Badge className="bg-white/20 text-white hover:scale-110 transition">
                  Long-Term
                </Badge>
                <Badge className="bg-white/20 text-white hover:scale-110 transition">
                  Medium Risk
                </Badge>
              </div>

              <p className="text-xs text-white/50 text-center">
                🔒 Your data is encrypted and secure
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
