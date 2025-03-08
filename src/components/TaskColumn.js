import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, searchQuery }) => {
  const tasks = useSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.status === status &&
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filtering based on search
    )
  );

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Paper
          elevation={3}
          sx={{ padding: 2, minHeight: "300px" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
            {status}
          </Typography>
          <Box>
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </Paper>
      )}
    </Droppable>
  );
};

export default TaskColumn;
