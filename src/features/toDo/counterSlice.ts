import { createSlice } from '@reduxjs/toolkit';

export interface CounterStateProps {
  count: number;
}

const counterInitialState = { count: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState: counterInitialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

const toDoCounterReducer = counterSlice.reducer;

export default toDoCounterReducer;
