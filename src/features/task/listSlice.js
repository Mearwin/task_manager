import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'task',
  initialState: {
    nextId: 1,
    lists: {},
  },
  reducers: {
    addList: (state, action) => {
      state.lists[state.nextId] = { ...action.payload, id: state.nextId };
      state.nextId++;
    },
    deleteList: (state, action) => {
      delete state.lists[action.payload.id];
    },
  },
});

export const { addList, deleteList } = listSlice.actions;

export default listSlice.reducer;
