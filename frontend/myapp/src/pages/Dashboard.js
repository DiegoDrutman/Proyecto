import React from 'react';
import { Typography, Container } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const Dashboard = () => {
    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Dashboard. More features coming soon.
            </Typography>
        </StyledContainer>
    );
};

export default Dashboard;
