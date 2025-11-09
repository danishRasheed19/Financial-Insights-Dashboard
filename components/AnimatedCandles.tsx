"use client";
import { useEffect, useRef } from "react";

export default function AnimatedCandles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const verticalCenter = 0.55; // 0.5 = middle of screen, tweak if login widget is slightly below
  const verticalRange = 250; // range of up/down candle swing
  const candleSpacing = 15;
  const scrollSpeed = 0.6;

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const numCandles = Math.floor(canvas.width / candleSpacing);
    let prevClose = 200; // start price
    let candles: any[] = [];

    // Initialize candle data
    for (let i = 0; i < numCandles; i++) {
      const low = prevClose - Math.random() * 60;
      const high = prevClose + Math.random() * 60;
      const open = prevClose;
      const close = Math.random() * (high - low) + low;
      prevClose = close;

      candles.push({
        open,
        close,
        high,
        low,
        color: close >= open ? "#22c55e" : "#ef4444",
      });
    }

    let offset = 0;
    let smoothCenter = prevClose; // current "target" vertical midpoint

    function drawCandle(x: number, candle: any, scaleY: (v: number) => number) {
      const { open, close, high, low, color } = candle;
      const bodyTop = Math.min(scaleY(open), scaleY(close));
      const bodyBottom = Math.max(scaleY(open), scaleY(close));
      const bodyHeight = bodyBottom - bodyTop;

      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      // Wick
      ctx.beginPath();
      ctx.moveTo(x, scaleY(high));
      ctx.lineTo(x, scaleY(low));
      ctx.stroke();

      // Body
      ctx.fillRect(x - 3, bodyTop, 6, bodyHeight || 2);
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // find current price range
      const allLows = candles.map(c => c.low);
      const allHighs = candles.map(c => c.high);
      const minVal = Math.min(...allLows);
      const maxVal = Math.max(...allHighs);
      const midVal = (minVal + maxVal) / 2;

      // smooth recentering
      smoothCenter += (midVal - smoothCenter) * 0.02; // inertia towards new center

      const targetMin = smoothCenter - verticalRange / 2;
      const targetMax = smoothCenter + verticalRange / 2;

      // mapping values → pixels
      const scaleY = (val: number) =>
        canvas.height * verticalCenter +
        ((smoothCenter - val) / (verticalRange / 2)) * (canvas.height * 0.25);

      // draw candles
      candles.forEach((c, i) => {
        const x = i * candleSpacing - offset;
        drawCandle(x, c, scaleY);
      });

      offset += scrollSpeed;

      if (offset > candleSpacing) {
        offset = 0;

        // create next candle
        const last = candles[candles.length - 1];
        const prevClose = last.close;
        const low = prevClose - Math.random() * 40;
        const high = prevClose + Math.random() * 40;
        const open = prevClose;
        const close = Math.random() * (high - low) + low;

        candles.shift();
        candles.push({
          open,
          close,
          high,
          low,
          color: close >= open ? "#22c55e" : "#ef4444",
        });
      }

      animationId=requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
