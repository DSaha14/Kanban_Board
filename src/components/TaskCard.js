import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <Card
          sx={{ marginBottom: 2 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
