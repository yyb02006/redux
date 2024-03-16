import {
  Action,
  ActionCreatorWithPayload,
  AnyAction,
  PayloadAction,
  ThunkAction,
  ThunkDispatch,
  configureStore,
  createAction,
  createSlice,
} from '@reduxjs/toolkit';
import toDoReducer from './features/toDo/toDoSlice';
import toDoCounterReducer from './features/toDo/counterSlice';
import counterA from './examples/counterA';
import counterB from './examples/counterB';
import { customLogger } from './middlewares/reduxMiddleare';

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

//Can use redux developer tools
const store = configureStore({
  //counterA, counterB제외
  reducer: { toDo: toDoReducer, counter: toDoCounterReducer },

  //preloadedState는 store가 생성되기 전에 설정되어 컴포넌트가 store를 구독하고 리렌더링되기 이전에 적절한 값을 할당함.
  //페이지 초기화같은 상황에서 상태를 유지하고 싶을 때 각 리듀서의 initialState를 사용하게 되면
  //각 슬라이스마다 API요청을 하거나 값을 받는 로직을 처리해야하게 되는데,
  //preloadedState를 사용하면 로그인정보와 같은 서버나 저장소로부터 받아온 정보를 한 번에 preloadedState로 전달할 수 있다.
  //만약 같이 사용할 때는 preloaded설정 우선.

  //typescript에서는 스프레드를 사용하면 배열을 결합할 때 배열 type을 string이나 number로 확장시켜버리는 경우가 많다.
  //예를 들어 타입이 정확히 1인 요소는 number|string이 된다
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customLogger),
});

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

export default store;
