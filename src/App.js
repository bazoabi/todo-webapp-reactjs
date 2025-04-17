import "./App.css";
import TodoList from "./components/TodoList";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { TodosProvider } from "./contexts/TodosContext";
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

function App() {
  // const [todos, setTodos] = useState(initialTodos);
  // const [todos, todosDispatch] = useReducer(TodosReducer, initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
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
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
