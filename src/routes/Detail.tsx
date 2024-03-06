import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToDoDispatch, remove } from '../store';

type DeleteTodo = (id: number) => void;

interface DetailProps {
  deleteToDo: DeleteTodo;
}

const Detail = ({ deleteToDo }: DetailProps) => {
  const { id } = useParams();
  return (
    <section>
      <div>Detail</div>
      <div>Id:{id}</div>{' '}
      <button
        type="button"
        onClick={() => {
          if (typeof id !== 'number') return;
          deleteToDo(parseInt(id));
        }}
      >
        delete
      </button>
    </section>
  );
};

const mapDispatchToProps = (dispatch: ToDoDispatch) => {
  return {
    deleteToDo: (id: number) => {
      dispatch(remove(id));
    },
  };
};

export default connect(() => ({}), mapDispatchToProps)(Detail);
