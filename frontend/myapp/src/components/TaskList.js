import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { TextField, Button, Container, Typography, Box, List, ListItem, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ project: projectId, title: '', description: '', due_date: '' });
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

    const fetchTasks = useCallback(async () => {
        try {
            const response = await getTasks();
            setTasks(response.data.filter(task => task.project === projectId));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [projectId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async () => {
        try {
            if (newTask.title && newTask.description) {
                await createTask(newTask);
                fetchTasks();
                setNewTask({ project: projectId, title: '', description: '', due_date: '' });
                setMessage('Task created successfully!');
                setMessageType('success');
            } else {
                setMessage('Title and description are required.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            setMessage('Error creating task.');
            setMessageType('error');
        }
    };

    const handleUpdateTask = async (task) => {
        try {
            await updateTask(task);
            fetchTasks();
            setMessage('Task updated successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error updating task:', error);
            setMessage('Error updating task.');
            setMessageType('error');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
            setMessage('Task deleted successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error deleting task:', error);
            setMessage('Error deleting task.');
            setMessageType('error');
        }
    };

    const handleTaskChange = (id, field, value) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, [field]: value } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Task List
            </Typography>
            {message && (
                <Alert severity={messageType} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
            <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Due Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCreateTask}>
                    Add Task
                </Button>
            </Box>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id} sx={{ mb: 1 }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={task.title}
                            onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                            sx={{ mr: 1 }}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={task.description}
                            onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                            sx={{ mr: 1 }}
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={task.due_date}
                            onChange={(e) => handleTaskChange(task.id, 'due_date', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                            sx={{ mr: 1 }}
                        />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </StyledContainer>
    );
};

export default TaskList;
