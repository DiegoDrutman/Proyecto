import React, { useEffect, useState, useCallback } from 'react';
import { getCollaborations, createCollaboration, deleteCollaboration } from '../services/api';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const CollaborationPanel = ({ projectId }) => {
    const [collaborations, setCollaborations] = useState([]);
    const [newCollaboration, setNewCollaboration] = useState({ project: projectId, user: '', role: '' });
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

    const fetchCollaborations = useCallback(async () => {
        try {
            const response = await getCollaborations();
            setCollaborations(response.data.filter(collab => collab.project === projectId));
        } catch (error) {
            console.error('Error fetching collaborations:', error);
            setMessage('Error fetching collaborations.');
            setMessageType('error');
        }
    }, [projectId]);

    useEffect(() => {
        fetchCollaborations();
    }, [fetchCollaborations]);

    const handleCreateCollaboration = async () => {
        try {
            if (newCollaboration.user && newCollaboration.role) {
                console.log('Creating collaboration with data:', newCollaboration); // Log data before request
                const response = await createCollaboration(newCollaboration);
                console.log('Create collaboration response:', response); // Log response from API
                fetchCollaborations();
                setNewCollaboration({ project: projectId, user: '', role: '' });
                setMessage('Collaboration created successfully!');
                setMessageType('success');
            } else {
                setMessage('User and role are required.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Error creating collaboration:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data); // Log detailed error response
                setMessage(`Error creating collaboration: ${error.response.data.detail || JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                setMessage('Network error. Please check your connection.');
            } else {
                setMessage(`Error creating collaboration: ${error.message}`);
            }
            setMessageType('error');
        }
    };

    const handleDeleteCollaboration = async (collaborationId) => {
        try {
            await deleteCollaboration(collaborationId);
            fetchCollaborations();
            setMessage('Collaboration deleted successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error deleting collaboration:', error);
            setMessage('Error deleting collaboration.');
            setMessageType('error');
        }
    };

    return (
        <StyledContainer>
            <Typography variant="h4" gutterBottom>
                Collaboration Panel
            </Typography>
            {message && (
                <Alert severity={messageType} onClose={() => setMessage(null)} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}
            <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
                <TextField
                    label="User ID"
                    variant="outlined"
                    fullWidth
                    value={newCollaboration.user}
                    onChange={(e) => setNewCollaboration({ ...newCollaboration, user: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    value={newCollaboration.role}
                    onChange={(e) => setNewCollaboration({ ...newCollaboration, role: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleCreateCollaboration}>
                    Add Collaboration
                </Button>
            </Box>
            <List>
                {collaborations.map((collab) => (
                    <ListItem key={collab.id} secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCollaboration(collab.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }>
                        <ListItemText primary={`User ID: ${collab.user}`} secondary={collab.role} />
                    </ListItem>
                ))}
            </List>
        </StyledContainer>
    );
};

export default CollaborationPanel;
