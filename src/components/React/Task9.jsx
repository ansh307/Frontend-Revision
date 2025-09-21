"use client";

// Build a Todo app with:
// CRUD functionality
// State management (useReducer or Zustand)
// Persistence in localStorage

import React, { useEffect, useState } from "react";
import useTodoStore from "./store";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const Task9 = () => {
  const [newTask, setNewTask] = useState("");

  const [modifiedTask, setModifiedTask] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  console.log("rendering again");

  const { todos, addTodo, removeTodo, updateTodo } = useTodoStore(
    (state) => state
  );

  // Debounced version of setNewTask
  const debouncedSetNewTask = debounce((value) => setNewTask(value), 200);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl font-bold">Todos</h2>
      <div>
        <input
          type="text"
          name=""
          id=""
          className="p-2 border rounded-xl"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              addTodo(newTask);
              setNewTask(""); // Clear input after adding
            }
          }}
          className="ml-5 bg-gray-300 p-2 rounded-xl"
        >
          Add Todo
        </button>
      </div>

      <ul className="flex flex-col gap-2 mt-4">
        {todos.length > 0 &&
          todos.map((todo) => {
            return (
              <li className="flex items-center justify-between " key={todo.id}>
                <input
                  type="text"
                  className={`p-2 rounded-xl `}
                  value={updatingTaskId === todo.id ? modifiedTask : todo.text}
                  onChange={(e) => setModifiedTask(e.target.value)}
                  disabled={updatingTaskId !== todo.id}
                />
                <div className="flex">
                  <button
                    className="ml-5 bg-blue-300 p-1 rounded-sm"
                    onClick={() => {
                      if (updatingTaskId === todo.id) {
                        updateTodo(todo.id, modifiedTask);
                        setUpdatingTaskId(null);
                      } else {
                        setUpdatingTaskId(todo.id);
                        setModifiedTask(todo.text);
                      }
                    }}
                    disabled={
                      modifiedTask === todo.text && updatingTaskId === todo.id
                    }
                  >
                    {updatingTaskId === todo.id ? "save" : "edit"}
                  </button>
                  <button
                    className="ml-5 bg-red-300 p-1 rounded-sm"
                    onClick={() => removeTodo(todo.id)}
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
