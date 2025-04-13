import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Dialogs
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Styles
import "../App.css";

// Hooks + Others
import { useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { useContext } from "react";

const nonCheckedbtnStyle = {
  color: "#8bc34a",
  background: "white",
  border: "solid #8bc34a 3px",
};

const checkedBtnStyle = {
  color: "white",
  background: "#66bd00",
  border: "solid #c9d0c1 3px",
};

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);

  // Dialog Logic //
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (action) => {
    if (action === "Agree") {
      // Delete the todo
      // setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));

      setTodos((prevTodos) =>
        prevTodos.filter((t) => {
          return t.id !== todo.id;
        })
      );
    }
    setOpen(false);
  };

  function DeleteDialog() {
    return (
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handleClose}
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
            onClick={() => handleClose("Disagree")}
            sx={{ color: "green" }}
          >
            לא
          </Button>
          <Button
            onClick={() => handleClose("Agree")}
            autoFocus
            sx={{ color: "red" }}
          >
            כן
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // === Dialog Logic === //

  // Toggle Completed Logic
  function toggleCompleted(id) {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  return (
    <>
      <CssBaseline />
      <Card
        key={todo.id}
        className="TodoCard"
        sx={{
          minWidth: 275,
          background: "#2a3f45",
          color: "white",
          marginTop: "1vh",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Divider />
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Check Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="Mark task as completed"
                sx={todo.completed ? checkedBtnStyle : nonCheckedbtnStyle}
                onClick={() => toggleCompleted(todo.id)}
              >
                <CheckIcon />
              </IconButton>
              {/* ==== Check Icon Button ==== */}

              {/* Edit Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="Edit task"
                sx={{
                  ...nonCheckedbtnStyle,
                  color: "#1769aa",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* ==== Edit Icon Button ==== */}

              {/* Delete Icon Button */}
              <IconButton
                className="iconButton"
                aria-label="Delete task"
                sx={{
                  ...nonCheckedbtnStyle,
                  color: "#b23c17",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleClickOpen}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ==== Delete Icon Button ==== */}
              <DeleteDialog />
              {/* Delete Confirmation Dialog */}

              {/* ==== Delete Confirmation Dialog ==== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
