import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DogState {
  url: string;
  loading: boolean;
  error: string;
}

interface DogPayloadProps<T> {
  data: T;
}

export type DogAction<T> = PayloadAction<DogPayloadProps<T>>;

const initialState: DogState = {
  url: 'https://cdn2.thecatapi.com/images/MTc2ODA1Mw.gif',
  loading: false,
  error: '',
};

const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {
    getDogUrlPending: (state) => {
      state.loading = true;
    },
    getDogUrlFulfilled: (state, action: DogAction<string>) => {
      const { data } = action.payload;
      state.url = data;
      state.loading = false;
    },
    getDogUrlRejected: (state, action: DogAction<string>) => {
      const { data } = action.payload;
      state.error = data;
      state.loading = false;
    },
  },
});

export const { getDogUrlFulfilled, getDogUrlPending, getDogUrlRejected } = dogSlice.actions;

const dogReducer = dogSlice.reducer;

export default dogReducer;
