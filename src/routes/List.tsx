import React, { ChangeEvent, useState } from 'react';
import { RootState } from '../store';
import ToDo from '../components/ToDo';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ActionTarget, abortAddIfNotString } from '../features/toDo/toDoSlice';

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
export const List = ({ target }: { target: ActionTarget }) => {
  const toDos = useAppSelector((state: RootState) => state.toDo[target]);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onAddClick = () => {
    setText('');
    //thunk의 실행순서와 미들웨어의 실행순서 테스트
    //결과 : 미들웨어가 먼저 실행되고 그 다음이 thunk
    dispatch(abortAddIfNotString({ data: text, target }));
  };
  return (
    <section>
      <input
        type="text"
        placeholder="add your plan"
        value={text}
        onChange={onTextChange}
        name="todo"
      />
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
