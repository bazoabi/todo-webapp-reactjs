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
import { useState } from "react";

// Components
import Todo from "./Todo";

// Others
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  function handleAddClick() {
    console.log("Add Clicked");
    if (titleInput === "") return;
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "תיאור המשימה",
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitleInput("");
  }

  // Todo Items Logic
  const TodosJsx = todos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  // Filter Buttons Logic
  const [alignment, setAlignment] = React.useState("left");
  const [titleInput, setTitleInput] = React.useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  //   Filter Buttons Logic //

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h2" sx={{ color: "text.secondary" }}>
              משימות
            </Typography>
            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "1vh" }}
            >
              <ToggleButton value="right" aria-label="right aligned">
                לא הושלם
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                הושלם
              </ToggleButton>
              <ToggleButton value="left" aria-label="left aligned">
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
                  onClick={() => {
                    handleAddClick();
                  }}
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
