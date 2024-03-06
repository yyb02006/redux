import React, { ChangeEvent, useState } from 'react';
import { ToDoState, add } from '../store';
import ToDo from '../components/ToDo';
import { useToDoDispatch, useToDoSelector } from '../hooks/reduxHooks';

/* 
기본적으로 아래처럼 사용할 수 있지만, 편의성을 위해 커스텀 훅의 사용을 추천

connect(mapStateToProps, mapDispatchToProps)(Home);

const mapSelectToProps = (state: ToDoStateProps[]) => {
  return { toDos:state };
};

const mapDispatchToProps = (dispatch: ToDoDispatch) => {
  return {
    addToDo: (text: string) => {
      dispatch(add(text));
    },
  };
};

type AddToDo = (text: string) => void;

interface HomeProps {
  toDos: ToDoState;
  addToDo: AddToDo;
}
*/

const Home = () => {
  const toDos = useToDoSelector((ste: ToDoState) => ste.toDos);
  const dispatch = useToDoDispatch();
  const [text, setText] = useState('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    setText('');
    dispatch(add(text));
  };
  const onDeleteClick = (id: number) => {};
  return (
    <section>
      <div style={{ fontSize: '4rem', fontWeight: '600' }}>To Do List</div>
      <input type="text" placeholder="add your plan" value={text} onChange={onTextChange} />
      <button type="button" onClick={onAddClick}>
        add
      </button>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} text={todo.text} id={todo.id} />
        ))}
        {/* {toDos.map((todo) => {
          const { id, text } = todo;
          return (
            <li key={id}>
              {text}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteClick(id);
                }}
              >
                delete
              </button>
            </li>
          );
        })} */}
      </ul>
    </section>
  );
};

export default Home;
