import { Middleware } from '@reduxjs/toolkit';
import { ActionTarget, ToDoStateProps } from '../features/toDo/toDoSlice';

// 미들웨어가 전달받을 수 있는 상태를 지정할 수 있으나
// store로부터 정의된 타입을 사용할 시 자기자신참조 에러가 생긴다.
// 같은 타입을 두 번 나누어서 처리해야 하는데 이럴거면 상태지정을 안하는 게 나을지도.
interface RootState {
  toDo: Record<ActionTarget, ToDoStateProps[]>;
  counter: {
    count: number;
  };
  counterA: number;
  counterB: number;
}

// 스토어에 등록될 커스텀 미들웨어
export const customLogger: Middleware<object, Omit<RootState, 'counterA' | 'counterB'>> =
  (store) => (next) => (action) => {
    console.log('Action:', action.type);
    console.log('Payload:', action.payload);
    // store.dispatch(), store.getState() 메서드 사용 가능

    // 다음 미들웨어로 연결. 다음 미들웨어가 없는 경우는 리듀서로 전달한다.
    // 필요에 따라 if문으로 return;하여 액션을 중단시킬 수도 있다.
    return next(action);
  };
