import React, { useState } from 'react';
import { createUser } from '../services/api';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const UserForm = () => {
    const [user, setUser] = useState({ username: '', email: '', first_name: '', last_name: '', password: '' });
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(user);
            setUser({ username: '', email: '', first_name: '', last_name: '', password: '' });
            setMessage('User created successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('Error creating user.');
            setMessageType('error');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create User
            </Typography>
            {message && (
                <Alert severity={messageType} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={user.first_name}
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={user.last_name}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Create User
                </Button>
            </Box>
        </Container>
    );
};

export default UserForm;
