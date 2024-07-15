import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  max-width: 400px;
  margin-top: 50px;
  text-align: center;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </StyledContainer>
  );
};

export default Login;
