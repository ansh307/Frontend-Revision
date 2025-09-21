"use client";

// useCallback

import React, { useState, useCallback } from "react";
import CounterButton from "./CounterButton";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Memoized increment handler
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // Memoized reset handler
  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <h2 className="text-2xl font-semibold">Count: {count}</h2>

      <div className="flex gap-4">
        <CounterButton onClick={increment} label="Increment" />
        <CounterButton onClick={reset} label="Reset" />
      </div>
    </div>
  );
};

export default Counter;
