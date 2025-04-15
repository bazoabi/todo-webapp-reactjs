import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Styles
import "../App.css";

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

export default function Todo({
  todo,
  handleClickOpenDeleteDialog,
  handleClickOpenUpdateDialog,
  handleToggleCompleteTodo,
}) {
  // const { todos, setTodos } = useContext(TodosContext);

  return (
    <>
      <CssBaseline />
      <Card
        key={todo.id}
        className="TodoCard"
        sx={{
          minWidth: 275,
          // take background color from theme
          backgroundColor: "background.TodoCardColor",
          // background: "background",
          color: "white",
          marginTop: "1vh",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
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
                onClick={() => handleToggleCompleteTodo(todo.id)}
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
                onClick={() => handleClickOpenUpdateDialog(todo)}
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
                onClick={() => handleClickOpenDeleteDialog(todo)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ==== Delete Icon Button ==== */}
              {/* <UpdateDialog /> */}
              {/* Delete Confirmation Dialog */}

              {/* ==== Delete Confirmation Dialog ==== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
