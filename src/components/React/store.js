import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const TodoStore = (set) => ({
  todos: [],

  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          text: todo,
          id: Date.now(),
        },
      ],
    })),

  removeTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),

  updateTodo: (todoId, todoText) =>
    set((state) => ({
      todos: state.todos.map((t) => {
        if (t.id === todoId) {
          return { ...t, text: todoText };
        } else {
          return t;
        }
      }),
    })),
});

const useTodoStore = create(
  devtools(
    persist(TodoStore, {
      name: "todos",
    })
  )
);

export default useTodoStore;
