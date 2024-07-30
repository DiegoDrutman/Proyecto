import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  max-width: 500px;
  margin: auto;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: ''
  });

  // Simulación de llamada a la API
  useEffect(() => {
    // Aquí deberías hacer una llamada real a la API
    setUser({ name: 'Jane Doe', email: 'jane.doe@example.com', bio: 'Enthusiastic learner and web developer.' });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos actualizados del usuario
    console.log('Saving user info:', user);
    // Agrega la llamada a la API para guardar los cambios
  };

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Bio"
        name="bio"
        multiline
        rows={4}
        value={user.bio}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button color="primary" variant="contained" onClick={handleSave}>
        Save Changes
      </Button>
    </FormContainer>
  );
};

export default UserProfile;
