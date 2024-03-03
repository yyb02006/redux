import { configureStore } from '@reduxjs/toolkit';

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
    case 'add': {
      if (action.text === undefined) return state;
      return [...state, { text: action.text, id: Date.now() }];
    }
    case 'delete': {
      if (action.id === undefined) return state;
      return state.filter((toDo) => toDo.id !== action.id);
    }
    default:
      return state;
  }
};

const store = configureStore({ reducer });

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
