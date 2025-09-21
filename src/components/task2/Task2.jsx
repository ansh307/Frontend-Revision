"use client";

// TASK2 : Implement a dark/light theme toggle using CSS variables.

import React, { useState } from "react";

const Task2 = () => {
  const [Dark, setDark] = useState(false);
  return (
    <div className="max-w-3xl flex flex-col justify-center mx-auto">
      <h1
        className={`text-2xl font-bold text-center ${
          Dark ? " bg-black " : " bg-blue-400 "
        }`}
      >
        Theme Toggler
      </h1>
      <button
        onClick={() => setDark((prev) => !prev)}
        className="bg-gray-500 border rounded-2xl w-54 "
      >
        toggle Theme
      </button>
    </div>
  );
};

export default Task2;
