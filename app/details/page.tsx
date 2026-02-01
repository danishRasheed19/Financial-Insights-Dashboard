"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

// Dummy data – later replace with API response
const priceHistory = [
  { time: "09:00", price: 120 },
  { time: "10:00", price: 125 },
  { time: "11:00", price: 123 },
  { time: "12:00", price: 128 },
  { time: "13:00", price: 132 },
];

export default function StockDetailsPage() {
  const stock = {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 132.45,
    change: "+2.14%",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{stock.name}</h1>
          <p className="text-muted-foreground">{stock.symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">${stock.currentPrice}</p>
          <p className="text-green-600">{stock.change}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <DollarSign className="w-5 h-5" />
            <CardTitle>Current Price</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            ${stock.currentPrice}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <CardTitle>Daily Change</CardTitle>
          </CardHeader>
          <CardContent className="text-xl text-green-600 font-semibold">
            {stock.change}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volume</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">
            5.2M
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Price Trend (Dummy Data)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Placeholder for future API-driven insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI / Analytics Insights</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          This section will later show insights powered by your FastAPI backend
          and LLM (trend analysis, sentiment, risk score, etc.).
        </CardContent>
      </Card>
    </div>
  );
}
