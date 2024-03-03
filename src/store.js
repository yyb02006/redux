import { configureStore, createAction } from '@reduxjs/toolkit';

/* const addToDo = (text) => {
  if (typeof text !== 'string') return;
  return { type: 'add', id: Date.now(), text };
}; */

/* const deleteToDo = (id) => {
  if (typeof id !== 'number') return;
  return { type: 'delete', id };
}; */

const addToDo = createAction('add');
const deleteToDo = createAction('delete');

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

const store = configureStore({ reducer });

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
