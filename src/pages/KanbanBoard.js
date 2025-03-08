import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setSearchQuery, updateTaskStatus, editTask, deleteTask } from "../redux/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Paper,
  Grid,
  IconButton,
  CssBaseline,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Brightness4, Brightness7, Add, Edit, Delete } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTaskData, setEditTaskData] = useState(null);
  const [darkMode, setDarkMode] = useState(useMediaQuery("(prefers-color-scheme: dark)"));

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" },
      background: { default: darkMode ? "#121212" : "#f4f4f4", paper: darkMode ? "#1e1e1e" : "#ffffff" },
      text: { primary: darkMode ? "#fff" : "#000" },
    },
  });

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      dispatch(addTask({ id: uuidv4(), title: newTask.title, description: newTask.description, status: "To Do" }));
      setNewTask({ title: "", description: "" });
      setShowForm(false);
    }
  };

  const handleEditTask = () => {
    if (editTaskData && editTaskData.title.trim() && editTaskData.description.trim()) {
      dispatch(editTask(editTaskData));
      setEditTaskData(null);
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(updateTaskStatus({ id: result.draggableId, status: result.destination.droppableId }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ padding: 3, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
        
        {/* Header: Dark Mode Toggle, Search Bar, and Add Task Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <TextField
            label="Search tasks..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            sx={{
              flex: 1,
              marginLeft: 2,
              borderRadius: "8px",
              backgroundColor: theme.palette.background.paper,
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowForm(true)}
            sx={{ marginLeft: 2, borderRadius: "8px" }}
          >
            Add Task
          </Button>
        </Box>

        {/* Drag and Drop Context */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={3}>
            {["To Do", "In Progress", "Peer Review", "Done"].map((status) => (
              <Grid item xs={12} sm={6} md={3} key={status}>
                <Paper elevation={4} sx={{ padding: 2, minHeight: "350px", borderRadius: "12px", backgroundColor: theme.palette.background.paper }}>
                  <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold", textAlign: "center" }}>{status}</Typography>
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ minHeight: "300px" }}>
                        {filteredTasks
                          .filter((task) => task.status === status)
                          .map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <Paper
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    borderRadius: "10px",
                                    background: darkMode ? "#333" : "linear-gradient(135deg, #a8c0ff, #3f2b96)",
                                    color: darkMode ? "#fff" : "#fff",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.02)" },
                                  }}
                                >
                                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{task.title}</Typography>
                                  <Typography variant="body2">{task.description}</Typography>

                                  {/* Edit & Delete Buttons */}
                                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}>
                                    <IconButton size="small" sx={{ color: "#fff" }} onClick={() => setEditTaskData(task)}>
                                      <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: "#ff4c4c" }} onClick={() => handleDeleteTask(task.id)}>
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </Paper>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>

        {/* Add/Edit Task Modal */}
        <Modal open={showForm || editTaskData !== null} onClose={() => { setShowForm(false); setEditTaskData(null); }}>
          <Paper sx={{ padding: 3, width: "350px", margin: "auto", marginTop: "10%", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>{editTaskData ? "Edit Task" : "Add Task"}</Typography>
            <TextField
              label="Title"
              fullWidth
              value={editTaskData ? editTaskData.title : newTask.title}
              onChange={(e) => editTaskData ? setEditTaskData({ ...editTaskData, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              value={editTaskData ? editTaskData.description : newTask.description}
              onChange={(e) => editTaskData ? setEditTaskData({ ...editTaskData, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" fullWidth onClick={editTaskData ? handleEditTask : handleAddTask}>
              {editTaskData ? "Update Task" : "Add Task"}
            </Button>
          </Paper>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default KanbanBoard;
