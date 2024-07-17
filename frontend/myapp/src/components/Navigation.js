import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import styled from 'styled-components';

const NavBar = styled(AppBar)`
  background-color: #0073e6;
`;

const Navigation = () => {
  return (
    <NavBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TaskWave
        </Typography>
        <Button color="inherit" component={Link} to="/projects">Projects</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
