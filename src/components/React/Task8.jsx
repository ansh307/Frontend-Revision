"use client";

// Build a Todo app with:
// CRUD functionality
// State management (useReducer or Zustand)
// Persistence in localStorage

import React, { useEffect, useState } from "react";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const Task8 = () => {
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [modifiedTask, setModifiedTask] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  console.log("rendering again");

  useEffect(() => {
    const fromData = JSON.parse(localStorage.getItem("todos"));
    console.log(fromData);
    if (fromData) {
      setTodos(fromData);
    }
  }, []);

  function addTasks(task) {
    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const newEntry = [
      ...todos,
      {
        text: task,
        id: Date.now(),
      },
    ];
    localStorage.setItem("todos", JSON.stringify(newEntry));
    setTodos(newEntry);
  }

  function removeTask(taskId) {
    const updatedTodos = todos.filter((t) => t.id !== taskId);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function updateTask(taskId, taskText) {
    const modifiedList = todos.map((t) => {
      if (t.id === taskId) {
        return { ...t, text: taskText };
      } else {
        return t;
      }
    });

    console.log("MODIFIED", modifiedList);

    localStorage.setItem("todos", JSON.stringify(modifiedList));
    setTodos(modifiedList);
    setUpdatingTaskId(null);
  }

  // Debounced version of setNewTask
  const debouncedSetNewTask = debounce((value) => setNewTask(value), 2000);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl font-bold">Todos</h2>
      <div>
        <input
          type="text"
          name=""
          id=""
          className="p-2 border rounded-xl"
          onChange={(e) => debouncedSetNewTask(e.target.value)}
        />
        <button
          onClick={() => addTasks(newTask)}
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
                        updateTask(todo.id, modifiedTask);
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
                    onClick={() => removeTask(todo.id)}
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
