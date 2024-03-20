import {
  ActionReducerMapBuilder,
  CaseReducerActions,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';

export type ActionTarget = 'me' | 'friend';

export interface ToDoStateProps {
  text: string;
  id: number;
}

interface ToDoPayloadProps<T> {
  data: T;
  target: ActionTarget;
}

export type ToDoAction<T> = PayloadAction<ToDoPayloadProps<T>>;

// rootState를 사용하지 않는 것을 추천하기 때문에 하위 프로퍼티 생성
const toDoInitialState: Record<ActionTarget, ToDoStateProps[]> = { me: [], friend: [] };

/* 
***** 슬라이스함수 바깥에 케이스리듀서 작성 가능

const add: CaseReducer<ToDoStateProps[], PayloadAction<string>> = (state, action) => {
  state.push({ text: action.payload, id: Date.now() });
}; 
*/

const promiseText = (text: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 5000);
  });

// async를 처리하는 미들웨어. createAsyncThunk로 만들어진 미들웨어는 이미 configureStore에 redux-thunk로 등록되어 있음
export const addAsync = createAsyncThunk('toDo/addAsync', async (text: string) => {
  const response = await promiseText(text);
  console.log('run asyncThunk');
  return response;
});

const handleAddAsyncReducers = (
  builder: ActionReducerMapBuilder<Record<ActionTarget, ToDoStateProps[]>>
) => {
  builder
    .addCase(addAsync.pending, (state) => {
      console.log('addPending');
    })
    .addCase(addAsync.fulfilled, (state) => {
      console.log('addFulfilled');
    })
    .addCase(addAsync.rejected, (state) => {
      console.log('addRejected');
    });
};

const toDoSlice = createSlice({
  name: 'toDo',
  initialState: toDoInitialState,
  reducers: {
    add: (state, action: ToDoAction<string>) => {
      const { data: text, target } = action.payload;
      state[target].push({ text, id: Date.now() });
    },
    remove: (state, action: ToDoAction<number>) => {
      const { data: id, target } = action.payload;
      return {
        ...state,
        [target]: state[target].filter((toDo) => toDo.id !== id),
      };
    },
  },
  // counterSlice에서 toDoSlice의 상태에 접근 가능.
  // extraReducers는 외부 액션을 받을 수 있기 때문에 공통액션을 createAction으로 외부에서 생성하는 방법도 있음.
  extraReducers: (builder) => {
    handleAddAsyncReducers(builder);
    builder
      .addCase('counter/increment', (state) => {
        console.log('increment');
      })
      .addCase('counter/decrement', (state) => {
        console.log('decrement');
      });
  },
});

export const { add, remove } = toDoSlice.actions;

// `toDoSlice의 프로퍼티들
// `const { actions, caseReducers, name, getInitialState, reducer } = toDoSlice;

// 호출가능 객체(callable object) type과 paylaod를 가진 action을 리턴하며 match, toString, type과 같은 프로퍼티를 가지고 있음
// console.log(actions);

// 각 케이스 리듀서들
// console.log(caseReducers);

// 슬라이스객체의 이름
// console.log(name);

// 슬라이스객체의 초기값
// console.log(getInitialState());

// store에 전달될 데이터들
// console.log(reducer);

const myText = (state: RootState) => state.toDo.me;

// 동기적 로직을 가지는 thunk미들웨어. 별도의 생성자 제공이 없기 떄문에 createAsyncThunk를 async없이 손으로 작성하는 것에 가까움.
// 디스패치에 직접 끼어들 수 있기 때문에 원포인트로 미들웨어가 필요할 때 사용 가능.
// middleware의 프로퍼티에 등록될 수 없음.
export const abortAddIfNotString =
  ({ data, target }: { data: string; target: ActionTarget }): AppThunk =>
  (dispatch, getState) => {
    if (typeof data === 'string' && data.length > 0) {
      dispatch(add({ data: data, target }));
      console.log(`${add.type} action success`);
    } else {
      console.log('fail');
    }
  };

const toDoReducer = toDoSlice.reducer;

export default toDoReducer;
