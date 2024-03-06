import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ToDoDispatch, ToDoState } from '../store';

export const useToDoDispatch = () => useDispatch<ToDoDispatch>();
export const useToDoSelector: TypedUseSelectorHook<ToDoState> = useSelector;
