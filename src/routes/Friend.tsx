import React, { memo } from 'react';
import { useToDoDispatch, useToDoSelector } from '../hooks/reduxHooks';
import { add } from '../store';

const Child = memo(function Child() {
  const toDos = useToDoSelector((state) => state.toDo.friend);
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

const Parent = () => {
  const toDos = useToDoSelector((state) => state.toDo.me);
  const dispatch = useToDoDispatch();
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
