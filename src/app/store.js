import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/taskSlice";

const loadFromLocalStorage = () => {
  try {
    const authSerialized = localStorage.getItem("teamTask-auth");
    const tasksSerialized = localStorage.getItem("teamTask-tasks");

    if (authSerialized === null && tasksSerialized === null) {
      return undefined;
    }

    return {
      auth: authSerialized ? JSON.parse(authSerialized) : undefined,
      tasks: tasksSerialized ? JSON.parse(tasksSerialized) : undefined,
    };
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  preloadedState,
});


store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("teamTask-auth", JSON.stringify(state.auth));
    localStorage.setItem("teamTask-tasks", JSON.stringify(state.tasks));
  } catch (e) {
    console.warn("Failed to save state to localStorage", e);
  }
});
