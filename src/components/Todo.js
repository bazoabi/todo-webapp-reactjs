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

// Styles
import "../App.css";

const btnStyle = {
  color: "#8bc34a",
  background: "white",
  border: "solid #8bc34a 3px",
};

const btnStyleChecked = {
  color: "white",
  background: "#66bd00",
  border: "solid #c9d0c1 3px",
};

export default function Todo({ todo }) {
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
              <IconButton
                className="iconButton"
                aria-label="Mark task as completed"
                sx={todo.completed ? btnStyleChecked : btnStyle}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="Edit task"
                sx={{
                  ...btnStyle,
                  color: "#1769aa",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="Edit task"
                sx={{
                  ...btnStyle,
                  color: "#b23c17",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
