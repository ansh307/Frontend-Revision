"use client";

// useCallback

import React, { useState } from "react";
import CounterButton from "./CounterButton";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <h2 className="text-2xl font-semibold">Count: {count}</h2>

      <div className="flex gap-4">
        <CounterButton onClick={() => setCount(count + 1)} label="Increment" />
        <CounterButton onClick={() => setCount(0)} label="Reset" />
      </div>
    </div>
  );
};

export default Counter;
