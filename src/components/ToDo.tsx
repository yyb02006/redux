import React from 'react';
import { connect } from 'react-redux';
import { ToDoDispatch, ToDoStateProps, remove } from '../store';
import { Link } from 'react-router-dom';

type DeleteToDo = () => void;

interface ToDoProps {
  text: string;
  deleteToDo: DeleteToDo;
  id: number;
}

const ToDo = ({ text, deleteToDo, id }: ToDoProps) => {
  const onDeleteClick = () => {
    deleteToDo();
  };
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>{' '}
      <button type="button" onClick={onDeleteClick}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch: ToDoDispatch, ownProps: ToDoStateProps) => {
  // to be able to refer to a Callable Object. example: remove.type === "toDo/remove"
  console.log(remove.type);
  // also able to call a function remove Object. example: remove.match({type:'toDo/remove'}) === true
  console.log(remove.match({ type: 'toDo/remove' }));
  return {
    deleteToDo: () => {
      dispatch(remove(ownProps.id));
    },
  };
};

export default connect(() => ({}), mapDispatchToProps)(ToDo);
