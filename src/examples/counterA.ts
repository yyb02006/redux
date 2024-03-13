import { createSlice } from '@reduxjs/toolkit';
import { addTwo } from './counterB';

const initialState: number = 0;

const counterSliceA = createSlice({
  name: 'sliceA',
  initialState,
  reducers: {
    increment(state) {
      return state + 1;
    },
    addFive(state) {
      return state + 5;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('addTwo', (state) => {
      return state + 2;
    });
  },
});

console.log(counterSliceA);
console.log('addTwo, imported from B to A: ', addTwo);

const { actions, reducer } = counterSliceA;

export const { increment, addFive } = actions;

export default reducer;
