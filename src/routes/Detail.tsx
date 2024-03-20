import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { remove } from '../features/toDo/toDoSlice';

/* type DeleteTodo = (id: number) => void;

interface DetailProps {
  deleteToDo: DeleteTodo;
} */

export default function Detail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  return (
    <section>
      <div>Detail</div>
      <div>Id:{id}</div>{' '}
      <button
        type="button"
        onClick={() => {
          if (typeof id !== 'number') return;
          dispatch(remove({ data: parseInt(id), target: 'me' }));
        }}
      >
        delete
      </button>
    </section>
  );
}
