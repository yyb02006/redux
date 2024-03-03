import { configureStore } from '@reduxjs/toolkit';

export type State = Array<{ text: string; id: number }>;

export type ActionTypes = 'add' | 'delete';

export interface ActionProps {
  type: ActionTypes;
  text?: string;
  id?: number;
}

const addToDo = (text: string): Omit<ActionProps, 'id'> => {
  return { type: 'add', text };
};

const deleteToDo = (id: number): Omit<ActionProps, 'text'> => {
  return { type: 'add', id };
};

const reducer = (state: State = [], action: ActionProps) => {
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

export default store;
