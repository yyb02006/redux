import { Action, PayloadAction, ThunkAction, configureStore, createSlice } from '@reduxjs/toolkit';

/* const addToDo = (text) => {
  if (typeof text !== 'string') return;
  return { type: 'add', id: Date.now(), text };
}; */

/* const deleteToDo = (id) => {
  if (typeof id !== 'number') return;
  return { type: 'delete', id };
}; */

/* const reducer = (state = [{ id: 3425, text: 'dfdf' }], action) => {
  switch (action.type) {
    case addToDo.type: {
      if (action.payload === undefined) return state;
      return [...state, { text: action.payload, id: Date.now() }];
    }
    case deleteToDo.type: {
      if (action.payload === undefined) return state;
      return state.filter((toDo) => toDo.id !== action.payload);
    }
    default:
      return state;
  }
}; */

/* const addToDo = createAction('add');
const deleteToDo = createAction('delete');

const reducer = createReducer([], {
  //함수의 리턴이 undefined일 때, state를 가져다쓰는 건 immer기능
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
}); */

export interface ToDoStateProps {
  text: string;
  id: number;
}

const initialState: ToDoStateProps[] = [];

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action: PayloadAction<number>) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

//Can use redux developer tools
const store = configureStore({ reducer: toDoSlice.reducer });

//toDoSlice의 프로퍼티들
//const { actions, caseReducers, name, getInitialState, reducer } = toDoSlice;

//호출가능 객체(callable object) type과 paylaod를 가진 action을 리턴하며 match, toString, type과 같은 프로퍼티를 가지고 있음
// console.log(actions);

//각 리듀서들
//console.log(caseReducers);

//슬라이스객체의 이름
//console.log(name);

//슬라이스객체의 초기값
//console.log(getInitialState());

//store에 전달될 데이터들
//console.log(reducer);

export type ToDoDispatch = typeof store.dispatch;
export type ToDoState = ReturnType<typeof store.getState>;
export type ToDoThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ToDoState,
  unknown,
  Action<string>
>;

//There are callable objects
export const { add, remove } = toDoSlice.actions;

export default store;
