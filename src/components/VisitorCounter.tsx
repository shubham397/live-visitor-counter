// VisitorCounter.tsx
import React, { useEffect, useState } from "react";
import "./visitorCounter.css";

interface VisitorCounterProps {
  initialCount?: number;
  min?: number;
  max?: number;
  interval?: number; // in ms
  useCompactFormat?: boolean;
}

const formatNumber = (value: number, compact: boolean) => {
  return compact
    ? Intl.NumberFormat(undefined, { notation: "compact" }).format(value)
    : value.toLocaleString();
};

const VisitorCounter: React.FC<VisitorCounterProps> = ({
  initialCount = 1234,
  min = 1000,
  max = 5000,
  interval = 1000,
  useCompactFormat = true,
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const timer = setInterval(() => {
      const delta = Math.floor(Math.random() * 1010 - 500); // -5 to +5
      setCount((prev) => Math.max(min, Math.min(max, prev + delta)));
    }, interval);

    return () => clearInterval(timer);
  }, [min, max, interval]);

  return (
    <div className="visitor-counter">
      👁️ <span className="number">{formatNumber(count, useCompactFormat)}</span>{" "}
      people viewing now
    </div>
  );
};

export default VisitorCounter;
