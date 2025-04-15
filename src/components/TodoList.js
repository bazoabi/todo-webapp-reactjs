import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo } from "react";

// Components
import Todo from "./Todo";

// Others
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";

export default function TodoList() {
  // console.log("TodoList Rendered");
  const { todos, setTodos } = useContext(TodosContext);

  // Fetch Todos from localStorage after mounting the TodoList for the first time
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  function handleAddClick() {
    console.log("Add Clicked");
    if (titleInput === "") return;
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "תיאור המשימה",
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  const [titleInput, setTitleInput] = React.useState("");

  // Filter Buttons Logic
  const [todosAlignment, setTodosAlignment] = React.useState("all");

  const completedTodosList = useMemo(() => {
    // console.log("Completed Todos List Rendered");
    return todos.filter((t) => t.completed);
  }, [todos]);
  const notCompletedTodosList = useMemo(() => {
    // console.log("Not Completed Todos List Rendered");
    return todos.filter((t) => !t.completed);
  }, [todos]);

  // Todo Items Logic
  let todosToBeRendered = todos;
  if (todosAlignment === null || todosAlignment === "all") {
    todosToBeRendered = todos;
  }
  if (todosAlignment === "completed") {
    todosToBeRendered = completedTodosList;
  } else if (todosAlignment === "notCompleted") {
    todosToBeRendered = notCompletedTodosList;
  }
  const TodosJsx = todosToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });
  // Todo Items Logic //

  const handleTodosAlignment = (event, newTodosAlignment) => {
    setTodosAlignment(newTodosAlignment);
  };
  //   Filter Buttons Logic //

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "50vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2" sx={{ color: "text.secondary" }}>
              משימות
            </Typography>
            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              value={todosAlignment}
              exclusive
              onChange={handleTodosAlignment}
              aria-label="Todos alignment"
              style={{ direction: "ltr", marginTop: "1vh" }}
              color="primary"
            >
              <ToggleButton value="notCompleted" aria-label="right aligned">
                לא הושלם
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                הושלם
              </ToggleButton>
              <ToggleButton value="all" aria-label="left aligned">
                הכל
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ==== Filter Buttons ==== */}

            {/* Todo Items */}
            {TodosJsx}
            {/* ==== Todo Items ==== */}

            <Grid container spacing={2} sx={{ marginTop: "2vh" }}>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="הוספת משימה חדשה"
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  value={titleInput}
                  onChange={(event) => {
                    setTitleInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", height: "100%" }}
                  style={{ background: "primary" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput === ""}
                >
                  הוספה
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
