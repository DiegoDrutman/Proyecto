import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    const handleCreateTask = async () => {
        if (newTask.title && newTask.description) {
            await createTask(newTask);
            fetchTasks();
            setNewTask({ title: '', description: '' });
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        await updateTask(updatedTask);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    const handleTaskChange = (id, field, value) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, [field]: value } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <div>
            <h1>Task List</h1>
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
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
