import React, { useState } from 'react';
import { actionCreators } from '../store';
import { connect } from 'react-redux';

const Home = ({ toDos, addToDo }) => {
  const [text, setText] = useState('');
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    setText('');
    addToDo(text);
  };
  const onDeleteClick = (id) => {};
  return (
    <section>
      <div style={{ fontSize: '4rem', fontWeight: '600' }}>To Do List</div>
      <input type="text" placeholder="add your plan" value={text} onChange={onTextChange} />
      <button type="button" onClick={onAddClick}>
        add
      </button>
      <ul>
        {JSON.stringify(toDos)}
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

const mapStateToProps = (state) => {
  return { toDos: state };
};

const mapDispatchToProps = (dispatch) => {
  return { addToDo: (text) => dispatch(actionCreators.addToDo(text)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
