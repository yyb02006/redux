import React, { ChangeEvent, useState } from 'react';
import { ActionTarget, ToDoState, add } from '../store';
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

// 리덕스는 Provider의 아래에 있는 데이터가 변하더라도 컴포넌트가 해당 데이터를 참조하고 있을 때만 리렌더링이 일어난다.
// 이는 useContext와 확실히 다르다.
const List = ({ target }: { target: ActionTarget }) => {
  const toDos = useToDoSelector((state: ToDoState) => state.toDo[target]);
  const dispatch = useToDoDispatch();
  const [text, setText] = useState('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    setText('');
    dispatch(add({ data: text, target }));
  };
  console.log(`${target} Rendered!!`);
  return (
    <section>
      <input type="text" placeholder="add your plan" value={text} onChange={onTextChange} />
      <button type="button" onClick={onAddClick}>
        add
      </button>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} data={todo} target={target} />
        ))}
      </ul>
    </section>
  );
};

export default function Home() {
  return (
    <section>
      <div style={{ fontSize: '4rem', fontWeight: '600', textAlign: 'center' }}>To Do List</div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <List target="me" />
        <List target="friend" />
      </div>
    </section>
  );
}
