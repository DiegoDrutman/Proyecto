import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ project: projectId, title: '', description: '', due_date: '' });

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
            } else {
                console.error('Title and description are required.');
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (task) => {
        try {
            await updateTask(task);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleTaskChange = (id, field, value) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, [field]: value } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h2>Task List</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Due Date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                />
                <button onClick={handleCreateTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                        />
                        <input
                            type="text"
                            value={task.description}
                            onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                        />
                        <input
                            type="date"
                            value={task.due_date}
                            onChange={(e) => handleTaskChange(task.id, 'due_date', e.target.value)}
                            onBlur={() => handleUpdateTask(task)}
                        />
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
