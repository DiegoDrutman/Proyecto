import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const NavBar = styled(AppBar)`
  background-color: #0073e6;
`;

const Logo = styled('img')`
  height: 50px;
  margin-right: 10px;
`;

const Navigation = () => {
  return (
    <NavBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo src={logo} alt="TaskWave Logo" />
          <Typography variant="h6">
            TaskWave
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/settings">
          Settings
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        </Toolbar>
    </NavBar>
  );
};

export default Navigation;
