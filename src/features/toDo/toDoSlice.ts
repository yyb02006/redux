import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { ToDoState, ToDoThunk } from '../../store';

export type ActionTarget = 'me' | 'friend';

export interface ToDoStateProps {
  text: string;
  id: number;
}

interface PayloadProps<T> {
  data: T;
  target: ActionTarget;
}

// rootState를 사용하지 않는 것을 추천하기 때문에 하위 프로퍼티 생성
const toDoInitialState: Record<ActionTarget, ToDoStateProps[]> = { me: [], friend: [] };

/* 
***** 슬라이스함수 바깥에 케이스리듀서 작성 가능

const add: CaseReducer<ToDoStateProps[], PayloadAction<string>> = (state, action) => {
  state.push({ text: action.payload, id: Date.now() });
}; 
*/

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: toDoInitialState,
  reducers: {
    add: (state, action: PayloadAction<PayloadProps<string>>) => {
      const { data, target } = action.payload;
      state[target].push({ text: data, id: Date.now() });
    },
    remove: (state, action: PayloadAction<PayloadProps<number>>) => {
      const { data, target } = action.payload;
      return {
        ...state,
        [target]: state[target].filter((toDo) => toDo.id !== data),
      };
    },
  },
  // counterSlice에서 toDoSlice의 상태에 접근 가능.
  // extraReducers는 외부 액션을 받을 수 있기 때문에 공통액션을 createAction으로 외부에서 생성하는 방법도 있음.
  extraReducers: (builder) => {
    builder
      .addCase('counter/increment', (state) => {
        console.log('increment');
      })
      .addCase('counter/decrement', (state) => {
        console.log('decrement');
      })
      .addDefaultCase(() => {
        console.log('default');
      });
  },
});

export const { add, remove } = toDoSlice.actions;

const myText = (state: ToDoState) => state.toDo.me;

// thunk미들웨어
export const addIfNotString =
  (text: string): ToDoThunk =>
  (dispatch, getState) => {
    const currentText = myText(getState());
    if (currentText.length > 0) {
      dispatch(add({ data: text, target: 'me' }));
    } else {
      console.log('fail');
    }
  };

const toDoReducer = toDoSlice.reducer;

export default toDoReducer;
