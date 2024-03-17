import React, { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { add } from '../features/toDo/toDoSlice';
import { increment } from '../features/toDo/counterSlice';

const Child = memo(function Child() {
  const toDos = useAppSelector((state) => state.toDo.friend);
  console.log('Child Component Rendered');
  return (
    <section
      style={{
        width: '600px',
        height: '200px',
        backgroundColor: 'blue',
        color: 'white',
      }}
    >
      Child
    </section>
  );
});

/* 
useDispatch의 대략적인 느낌
function useDispatch() {
  const { reducers, dispatch, getState } = store;
  return (actionOrFunction) => {
    switch (typeof actionOrFunction) {
      case 'object':
        reducers[actionOrFunction.type](actionOrFunction.data);
        break;
      case 'function':
        break;
        actionOrFunction(dispatch,getState);
      default:
        console.log('error');
        break;
    }
  };
}
*/

/* 
thunk미들웨어의 대략적인 느낌
const thunkMiddleware = createThunkMiddleware(extraArg);

function thunkMiddleware(thunkMiddleware, secondMiddleware) {
  const dispatch = dispatchFromStore();
  const getState = stateFromStore();
  const action = actionFromReducer();
  thunkMiddleware(dispatch,getState)(secondMiddleware)(action);
}
*/

/* 
컴포넌트에서는 아래처럼 직접 참조를 할당하는 것 대신
커스텀 훅으로 참조를 반환하게 하는 것이 좋다.
const someComponent = () => {
  const [count, setCount] = useState(0);
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch({ type: 'count', data: count });
  }, [dispatch, count]);
  return (
    <div
      onClick={() => {
        setCount((p) => p + 1);
      }}
    >
      Click
    </div>
  );
};
*/

const Parent = () => {
  const toDos = useAppSelector((state) => state.toDo.me);
  const counter = useAppSelector((state) => state.counter);
  console.log(counter.count);
  const dispatch = useAppDispatch();
  console.log('Parent Component Rendered');
  return (
    <section
      style={{
        width: '600px',
        height: '400px',
        backgroundColor: 'red',
        color: 'white',
      }}
      onClick={() => {
        dispatch(add({ data: 'Parent', target: 'me' }));
        dispatch(increment());
        console.log(increment());
      }}
    >
      Parent
      <Child />
    </section>
  );
};

export default function Friend() {
  console.log('Container Component Rendered');
  return (
    <section
      style={{
        width: '600px',
        height: '600px',
        backgroundColor: 'yellow',
        fontSize: '2rem',
        fontWeight: 600,
        color: 'black',
      }}
    >
      Friend
      <Parent />
    </section>
  );
}
