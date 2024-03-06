import React from 'react';
import { ActionTarget, ToDoStateProps, remove } from '../store';
import { Link } from 'react-router-dom';
import { useToDoDispatch } from '../hooks/reduxHooks';

interface ToDoProps {
  data: ToDoStateProps;
  target: ActionTarget;
}

export default function ToDo({ data: { id, text }, target }: ToDoProps) {
  const dispatch = useToDoDispatch();
  const onDeleteClick = () => {
    dispatch(remove({ data: id, target }));
  };
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>{' '}
      <button type="button" onClick={onDeleteClick}>
        Delete
      </button>
    </li>
  );
}

/* const mapDispatchToProps = (dispatch: ToDoDispatch, ownProps: ToDoStateProps) => {
  // to be able to refer to a Callable Object. example: remove.type === "toDo/remove"
  console.log(remove.type);
  // also able to call a function remove Object. example: remove.match({type:'toDo/remove'}) === true
  console.log(remove.match({ type: 'toDo/remove' }));
  return {
    deleteToDo: () => {
      dispatch(remove(ownProps.id));
    },
  };
}; */
