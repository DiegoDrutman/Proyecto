// src/pages/Settings.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { updateUserProfile, changeUserPassword } from '../services/api'; // Asegúrate de tener estas funciones en tu API

const StyledContainer = styled(Container)`
  max-width: 600px;
  margin-top: 50px;
  text-align: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Settings = () => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(profile);
      if (response.success) {
        setMessage('Profile updated successfully!');
        setMessageType('success');
      } else {
        setMessage(response.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to update profile.');
      setMessageType('error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changeUserPassword(passwords);
      if (response.success) {
        setMessage('Password changed successfully!');
        setMessageType('success');
      } else {
        setMessage(response.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to change password.');
      setMessageType('error');
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      {message && (
        <Alert severity={messageType} onClose={() => setMessage('')} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Box component="form" onSubmit={handleProfileSubmit} noValidate autoComplete="off" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Update Profile
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Update Profile
        </Button>
      </Box>

      <Box component="form" onSubmit={handlePasswordSubmit} noValidate autoComplete="off">
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          variant="outlined"
          type="password"
          fullWidth
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Change Password
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default Settings;
