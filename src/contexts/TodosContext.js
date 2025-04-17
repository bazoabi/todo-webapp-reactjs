import { createContext, useContext, useReducer } from "react";
import TodosReducer from "../reducers/TodosReducer";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "משימה 1",
    details: "תיאור המשימה 1",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "משימה 2",
    details: "תיאור המשימה 2",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "משימה 3",
    details: "תיאור המשימה 3",
    completed: false,
  },
];

const TodosContext = createContext({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(TodosReducer, initialTodos);

  return (
    <TodosContext.Provider value={{ todos, todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
