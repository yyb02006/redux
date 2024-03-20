import { createSlice } from '@reduxjs/toolkit';
import { addFive } from './counterA';

const initialState: number = 0;

const counterSliceB = createSlice({
  name: 'sliceB',
  initialState,
  reducers: {
    increment(state) {
      return state + 1;
    },
    addTwo(state) {
      return state + 2;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('addFive', (state) => {
      return state + 5;
    });
  },
});

console.log(counterSliceB);
console.log('addFive, imported from A to B: ', addFive);

const { actions, reducer } = counterSliceB;

export const { increment, addTwo } = actions;

export default reducer;
