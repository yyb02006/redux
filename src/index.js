import { configureStore } from '@reduxjs/toolkit';

const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const reducer = (count = 0, action) => {
  switch (action.type) {
    case 'PLUS':
      return count + 1;
    case 'MINUS':
      return count - 1;
    default:
      return count;
  }
};

const countStore = configureStore({ reducer });

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

plus.addEventListener('click', () => countStore.dispatch({ type: 'PLUS' }));
minus.addEventListener('click', () => countStore.dispatch({ type: 'MINUS' }));
