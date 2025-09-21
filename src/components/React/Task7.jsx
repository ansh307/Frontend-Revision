"use client";

// Build a Todo app with:
// CRUD functionality
// State management (useReducer or Zustand)
// Persistence in localStorage

import React, { useState } from "react";

export const Task7 = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  console.log("tasks: ", tasks);

  function addTasks() {
    setTasks((prev) => [...prev, { text: input, id: Date.now() }]);
    setInput("");
  }

  function removeTasks(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function updateTasks(taskId, newTask) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, text: newTask, id: Date.now() };
        } else {
          return t;
        }
      })
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl font-bold">Todos</h2>
      <div>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded-xl"
          value={input}
        />
        <button onClick={addTasks} className="ml-5 bg-gray-300 p-2 rounded-xl">
          Add Todo
        </button>
      </div>

      <ul className="flex flex-col gap-2 mt-4">
        {tasks &&
          tasks.map((task) => {
            return (
              <li key={task.id} className="flex items-center justify-between ">
                <input
                  type="text"
                  value={updatingTaskId === task.id ? updatedTask : task.text}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  className={`p-2 rounded-xl `}
                  disabled={updatingTaskId !== task.id}
                />
                <div className="flex">
                  <button
                    className="ml-5 bg-blue-300 p-1 rounded-sm"
                    onClick={() => {
                      if (updatingTaskId === task.id) {
                        updateTasks(task.id, updatedTask);
                      } else {
                        setUpdatingTaskId(task.id);
                        setUpdatedTask(task.text);
                      }
                    }}
                  >
                    {updatingTaskId === task.id ? "save" : "edit"}
                  </button>
                  <button
                    className="ml-5 bg-red-300 p-1 rounded-sm"
                    onClick={() => removeTasks(task.id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
