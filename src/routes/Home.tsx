import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { State } from '../store';

export default function Home() {
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState<State>([]);
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    const newToDo = { id: Date.now(), text };
    setToDos((p) => [...p, newToDo]);
  };
  const onDeleteClick = (id: number) => {
    setToDos((p) => p.filter((todo) => todo.id !== id));
  };
  return (
    <section>
      <div style={{ fontSize: '4rem', fontWeight: '600' }}>To Do List</div>
      <input type="text" placeholder="add your plan" value={text} onChange={onTextChange} />
      <button type="button" onClick={onAddClick}>
        add
      </button>
      <ul>
        {toDos.map((todo) => {
          const { id, text } = todo;
          return (
            <li key={id}>
              {text}
              <button
                type="button"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  onDeleteClick(id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
