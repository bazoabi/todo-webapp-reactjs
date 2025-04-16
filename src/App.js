import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "./contexts/TodosContext";
import { ToastProvider } from "./contexts/ToastContext";

// Create a theme instance.
const theme = createTheme({
  typography: {
    // Set the global font family for the application.
    fontFamily: `'Rubik'`,
  },
  // You can add more theme customization below.
  palette: {
    primary: {
      main: "#ff6e40",
    },
    // add todos cards background color
    background: {
      TodoCardColor: "#283593",
    },
  },
});

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

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "gray",
            height: "100vh",
            direction: "rtl",
          }}
        >
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
