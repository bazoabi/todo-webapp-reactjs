import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    // Set the global font family for the application.
    fontFamily: `'Rubik'`,
  },
  // You can add more theme customization below.
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
