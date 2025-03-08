import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: "1", title: "Task 1", description: "First task", status: "To Do" },
    { id: "2", title: "Task 2", description: "Second task", status: "In Progress" },
    { id: "3", title: "Task 3", description: "Third task", status: "Peer Review" },
    { id: "4", title: "Task 4", description: "Fourth task", status: "Done" },
  ],
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status;
      }
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, updateTaskStatus, editTask, deleteTask, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
