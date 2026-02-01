"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts"

const recommendedStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.42,
    confidence: "High",
    reason: "Stable growth, strong fundamentals",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 403.12,
    confidence: "High",
    reason: "AI leadership & recurring revenue",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    price: 612.55,
    confidence: "Medium",
    reason: "High growth, higher volatility",
  },
]

// KPI Data
const kpis = [
  { label: "Risk Level", value: "Medium" },
  { label: "Expected Return", value: "8–12%" },
  { label: "Volatility", value: "Moderate" },
  { label: "Time Horizon", value: "3–5 yrs" },
]

// Portfolio Distribution Data
const portfolioData = [
  { name: "Tech", value: 40 },
  { name: "Finance", value: 25 },
  { name: "Healthcare", value: 20 },
  { name: "Energy", value: 15 },
]
const portfolioColors = ["#6366F1", "#EC4899", "#10B981", "#F59E0B"]

// Personality Alignment Data
const radarData = [
  { trait: "Risk Tolerance", value: 80 },
  { trait: "Growth Focus", value: 90 },
  { trait: "Volatility Comfort", value: 60 },
  { trait: "Long-Term Focus", value: 75 },
  { trait: "Analytical", value: 85 },
]

// Confidence Level Data
const barData = recommendedStocks.map((s) => ({
  symbol: s.symbol,
  confidence: s.confidence === "High" ? 100 : s.confidence === "Medium" ? 70 : 50,
}))

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Welcome, Danish 👋</h1>
      </div>

      {/* Personality Overview */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_30px_rgba(255,255,255,0.1)] rounded-xl">
        <CardHeader>
          <CardTitle className="text-white">Investor Personality</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Badge className="bg-white text-black rounded-lg px-3 py-1 font-medium transform transition-transform duration-300 hover:scale-110">
            Analytical Thinker
          </Badge>
          <Badge className="bg-white text-black rounded-lg px-3 py-1 font-medium transform transition-transform duration-300 hover:scale-110">
            Medium Risk
          </Badge>
          <Badge className="bg-white text-black rounded-lg px-3 py-1 font-medium transform transition-transform duration-300 hover:scale-110">
            Long-Term Focused
          </Badge>
        </CardContent>
      </Card>

      {/* Portfolio Snapshot */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-xl">
        <CardHeader>
          <CardTitle className="text-white drop-shadow-sm">Portfolio Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
          {kpis.map((kpi) => (
            <Metric key={kpi.label} label={kpi.label} value={kpi.value} />
          ))}
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Distribution */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-xl p-4">
          <CardTitle className="text-white mb-2">Portfolio Distribution</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={portfolioData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                label
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={portfolioColors[index]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Personality Alignment */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-xl p-4">
          <CardTitle className="text-white mb-2">Personality Alignment</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff33" />
              <PolarAngleAxis dataKey="trait" stroke="white" />
              <PolarRadiusAxis stroke="#ffffff33" />
              <Radar dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Confidence Levels */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-xl p-4">
          <CardTitle className="text-white mb-2">Confidence Levels</CardTitle>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="symbol" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "white" }} />
              <Bar dataKey="confidence" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommended Stocks */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white drop-shadow-md">
          Top Recommended Stocks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedStocks.map((stock) => (
            <Card
              key={stock.symbol}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-white drop-shadow-sm">
                  {stock.symbol}
                  <Badge className="bg-white/20 text-white">{stock.confidence}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 text-white">
                <p className="text-sm text-white/90">{stock.name}</p>
                <p className="text-2xl font-bold text-white drop-shadow-md">${stock.price}</p>
                <p className="text-sm text-white/80">{stock.reason}</p>

                <Button className="w-full mt-2 text-black cursor-pointer" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Explanation */}
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.1)] rounded-xl">
        <CardHeader>
          <CardTitle className="text-white drop-shadow-sm">Why These Stocks?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-white/80">
            Based on your analytical personality and moderate risk tolerance,
            we prioritize companies with strong fundamentals, predictable
            earnings, and exposure to long-term technology trends. Volatile
            stocks are included selectively for upside potential.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-white/80">{label}</p>
      <p className="text-lg font-semibold text-white drop-shadow-sm">{value}</p>
    </div>
  )
}
