/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import './styles.css';
import { increment as incrementA, addFive } from './counterA';
import { increment as incrementB, addTwo } from './counterB';
import store from '../store';

console.log('Initial state: ', store.getState());

[incrementA, incrementB, addFive, addTwo].forEach((actionCreator) => {
  store.dispatch(actionCreator());
  console.log(`After action '${actionCreator}': `, store.getState());
});

export default function CyclicDependency() {
  const actionCreators = {
    incrementA,
    incrementB,
    addTwo,
    addFive,
  };
  // const { counterA, counterB } = store.getState();
  const [counterA, counterB] = ['1', '2'];
  return (
    <>
      <div className="App">
        <h1>Circular Slice Dependencies Example</h1>
      </div>
      <h2>Counter Values</h2>
      <ul>
        <li>
          <b>Counter A</b>: {counterA}
        </li>
        <li>
          <b>Counter B</b>: {counterB}
        </li>
      </ul>

      <div>
        <button onClick={() => incrementA()}>Increment A</button>
        <button onClick={() => incrementB()}>Increment B</button>
        <button onClick={() => addTwo()}>Add Two to Both</button>
        <button onClick={() => addFive()}>Add Five to Both</button>
      </div>

      <p>
        Notice that "Add Five" only adds to A, not B. This is caused by circular imports between the{' '}
        <code>counterA.tsx</code> and <code>counterB.tsx</code> files. When B imports{' '}
        <code>addFive()</code> from A, A hasn't finished initializing yet, so <code>addFive()</code>{' '}
        is still undefined.
      </p>
    </>
  );
}
