import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TaskCard = ({ task }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
