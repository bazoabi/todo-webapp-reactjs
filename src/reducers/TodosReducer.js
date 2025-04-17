import { v4 as uuidv4 } from "uuid";

export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "תיאור המשימה",
        completed: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "REMOVE_TODO": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "TOGGLE_TODO": {
      const updatedTodos = currentTodos.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "GET_TODOS": {
      const todos = JSON.parse(localStorage.getItem("todos")) || currentTodos;
      return todos;
    }
    case "UPDATE_TODO": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default:
      throw Error(
        "There was an error inside TodosReducer parsing the action type: ",
        action.type
      );
  }
}
