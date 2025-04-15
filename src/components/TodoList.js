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

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Others
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/TodosContext";
import { useContext, useState } from "react";

export default function TodoList() {
  // console.log("TodoList Rendered");
  const { todos, setTodos } = useContext(TodosContext);
  const [activeDialogTodo, setActiveDialogTodo] = useState(null);

  // Fetch Todos from localStorage after mounting the TodoList for the first time
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Delete Dialog Logic //
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = (todo) => {
    setOpenDeleteDialog(true);
    setActiveDialogTodo(todo);
  };

  const handleCloseDeleteDialog = (action) => {
    if (action === "Agree") {
      // Delete the todo
      const updatedTodos = todos.filter((t) => {
        return t.id !== activeDialogTodo.id;
      });
      setTodos(updatedTodos);
      // Update the local storage with the new todos array
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
    setOpenDeleteDialog(false);
    setActiveDialogTodo(null);
  };

  function DeleteDialog() {
    return (
      <Dialog
        sx={{ direction: "rtl" }}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"מחיקת משימה"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            האם תרצה למחוק את המשימה?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDeleteDialog("Disagree")}
            sx={{ color: "green" }}
          >
            לא
          </Button>
          <Button
            onClick={() => handleCloseDeleteDialog("Agree")}
            autoFocus
            sx={{ color: "red" }}
          >
            כן
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // === Delete Dialog Logic === //

  // Update Dialog Logic //
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleClickOpenUpdateDialog = (todo) => {
    setOpenUpdateDialog(true);
    setActiveDialogTodo(todo);
  };

  function UpdateDialog() {
    const [updatedTodo, setUpdatedTodo] = useState({
      title: activeDialogTodo?.title,
      details: activeDialogTodo?.details,
    });

    const handleCloseUpdateDialog = (action) => {
      if (action === "Agree") {
        // Update todo
        const updatedTodos = todos.map((t) => {
          if (t.id === activeDialogTodo.id) {
            return {
              ...t,
              title: updatedTodo.title,
              details: updatedTodo.details,
            };
          } else {
            return t;
          }
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      }
      setOpenUpdateDialog(false);
      setActiveDialogTodo(null);
    };

    return (
      <Dialog
        sx={{ direction: "rtl" }}
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"עריכת משימה"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="todoTitle"
            name="todoTitle"
            label="שם המשימה"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="todoDetails"
            name="todoDetails"
            label="תיאור המשימה"
            multiline
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseUpdateDialog("Disagree")}
            sx={{ color: "red" }}
          >
            ביטול
          </Button>
          <Button
            onClick={() => handleCloseUpdateDialog("Agree")}
            autoFocus
            sx={{ color: "green" }}
          >
            עדכון
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // === Update Dialog Logic === //

  // Toggle Complete Task Logic //
  function handleToggleCompleteTodo(id) {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    // Update the local storage with the new todos array
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // ==== Toggle Complete Task Logic ==== //

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
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handleClickOpenDeleteDialog={handleClickOpenDeleteDialog}
        handleClickOpenUpdateDialog={handleClickOpenUpdateDialog}
        handleToggleCompleteTodo={handleToggleCompleteTodo}
      />
    );
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

        {/* Dialogs */}
        <DeleteDialog />
        <UpdateDialog />
        {/* === Dialogs === */}
      </Container>
    </>
  );
}
