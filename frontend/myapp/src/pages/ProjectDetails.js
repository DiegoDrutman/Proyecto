import React from 'react';
import { Typography, Container } from '@mui/material';
import TaskList from '../components/TaskList';
import CollaborationPanel from '../components/CollaborationPanel';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const ProjectDetails = () => {
    const { id } = useParams();
    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Project Details
            </Typography>
            <TaskList projectId={id} />
            <CollaborationPanel projectId={id} />
        </StyledContainer>
    );
};

export default ProjectDetails;
