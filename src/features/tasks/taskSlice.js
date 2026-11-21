
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    updateTask: (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.id
      );

      if (task) {
        task.title = action.payload.title;
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
