import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    nextId: 1,
    tasks: {},
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks[state.nextId] = { ...action.payload, id: state.nextId };
      state.nextId++;
    },
    toggleTask: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.doneOn = task.doneOn ? null : action.payload.date;
    },
    deleteTask: (state, action) => {
      delete state.tasks[action.payload.id];
    },
    importState: (state, action) => {
      state.nextId = action.payload.nextId;
      state.tasks = action.payload.tasks;
    }
  },
});

export const { addTask, toggleTask, deleteTask, importState } = taskSlice.actions;

export default taskSlice.reducer;
