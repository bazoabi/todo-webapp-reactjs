import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: blueGrey[500],
//     },
//     secondary: {
//       main: "#f44336",
//     },
//   },
// });

function App() {
  return (
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
  );
}

export default App;
