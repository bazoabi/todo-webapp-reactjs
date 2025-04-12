import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TodoList() {
  // Filter Buttons Logic
  const [alignment, setAlignment] = React.useState("left");

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
            <Typography
              variant="h2"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
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
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
