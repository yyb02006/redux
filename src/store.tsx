import { Action, PayloadAction, ThunkAction, configureStore, createSlice } from '@reduxjs/toolkit';

/* 
***** 원시적인 리듀서 생성 방법

const addToDo = (text) => {
  if (typeof text !== 'string') return;
  return { type: 'add', id: Date.now(), text };
};

const deleteToDo = (id) => {
  if (typeof id !== 'number') return;
  return { type: 'delete', id };
};

const reducer = (state = [{ id: 3425, text: 'dfdf' }], action) => {
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
}; 
*/

/* 
***** createAction과 createReducer함수로 생성 가능

const addToDo = createAction('add');
const deleteToDo = createAction('delete');

const reducer = createReducer([], {
  //함수의 리턴이 undefined일 때, state를 가져다쓰는 건 immer기능
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
}); 
*/

export interface ToDoStateProps {
  text: string;
  id: number;
}

// rootState를 사용하지 않는 것을 추천하기 때문에 하위 프로퍼티 생성
const initialState: { toDos: ToDoStateProps[] } = { toDos: [] };

/* 
***** 슬라이스함수 바깥에 케이스리듀서 작성 가능

const add: CaseReducer<ToDoStateProps[], PayloadAction<string>> = (state, action) => {
  state.push({ text: action.payload, id: Date.now() });
}; 
*/

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.toDos.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action: PayloadAction<number>) => ({
      toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
    }),
  },
});

//Can use redux developer tools
const store = configureStore({ reducer: toDoSlice.reducer });

//toDoSlice의 프로퍼티들
//const { actions, caseReducers, name, getInitialState, reducer } = toDoSlice;

//호출가능 객체(callable object) type과 paylaod를 가진 action을 리턴하며 match, toString, type과 같은 프로퍼티를 가지고 있음
// console.log(actions);

//각 케이스 리듀서들
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
