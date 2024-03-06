import React, { ChangeEvent, useState } from 'react';
import { ToDoDispatch, ToDoState, add } from '../store';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';

type AddToDo = (text: string) => void;

interface HomeProps {
  toDos: ToDoState;
  addToDo: AddToDo;
}

const Home = ({ toDos, addToDo }: HomeProps) => {
  const [text, setText] = useState('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    setText('');
    addToDo(text);
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

const mapStateToProps = (state: ToDoState) => {
  return { toDos: state };
};

const mapDispatchToProps = (dispatch: ToDoDispatch) => {
  return {
    addToDo: (text: string) => {
      dispatch(add(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
