"use client";
import { useState } from "react";
import AnimatedCandles from "@/components/AnimatedCandles";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", firstName + " " + lastName, "Email:", email, "Password:", password);
    // TODO: Add API call to backend for authentication
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-black overflow-hidden">
      {/* Animated candles in the background */}
      <AnimatedCandles />

      {/* Centered signup form */}
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 text-white">Register</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* First Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-white">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Last Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-white">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-white mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
