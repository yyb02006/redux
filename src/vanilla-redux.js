import { configureStore } from '@reduxjs/toolkit';

const add = document.querySelector('button');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const actionTypes = { add: 'add', del: 'delete' };

const addToList = (text) => ({ type: actionTypes.add, text });

const deleteToList = (id) => ({ type: actionTypes.del, id });

const reducer = (states = [], action) => {
  const { add, del } = actionTypes;
  switch (action.type) {
    case add: {
      const newState = { text: action.text, id: Date.now() };
      return [...states, newState];
    }
    case del: {
      const cleanedStates = states.filter((state) => state.id.toString() !== action.id.toString());
      return cleanedStates;
    }
    default:
      return states;
  }
};

const listStore = configureStore({ reducer });

const dispatchAddToList = (action) => {
  if (!action.type || !action.text) return;
  listStore.dispatch(action);
};

const dispatchDeleteToList = (action) => {
  if (!action.type || !action.id) return;
  listStore.dispatch(action);
};

const onAddClick = (e) => {
  e.preventDefault();
  dispatchAddToList(addToList(input.value));
  input.value = '';
};

const onDeleteClick = (e) => {
  e.preventDefault();
  const id = e.target.parentNode.id;
  dispatchDeleteToList(deleteToList(id));
};

listStore.subscribe(() => {
  const toDos = listStore.getState();
  ul.innerHTML = '';
  toDos.forEach((toDo) => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(deleteBtn);
    li.addEventListener('click', onDeleteClick);
    ul.appendChild(li);
  });
});

add.addEventListener('click', onAddClick);
