import React, { useEffect, useState, useCallback } from 'react';
import { getCollaborations, createCollaboration, deleteCollaboration } from '../services/api';

const CollaborationPanel = ({ projectId }) => {
    const [collaborations, setCollaborations] = useState([]);
    const [newCollaboration, setNewCollaboration] = useState({ project: projectId, user: '', role: '' });

    const fetchCollaborations = useCallback(async () => {
        try {
            const response = await getCollaborations();
            setCollaborations(response.data.filter(collab => collab.project === projectId));
        } catch (error) {
            console.error('Error fetching collaborations:', error);
        }
    }, [projectId]);

    useEffect(() => {
        fetchCollaborations();
    }, [fetchCollaborations]);

    const handleCreateCollaboration = async () => {
        try {
            if (newCollaboration.user && newCollaboration.role) {
                await createCollaboration(newCollaboration);
                fetchCollaborations();
                setNewCollaboration({ project: projectId, user: '', role: '' });
            } else {
                console.error('User and role are required.');
            }
        } catch (error) {
            console.error('Error creating collaboration:', error);
        }
    };

    const handleDeleteCollaboration = async (collaborationId) => {
        try {
            await deleteCollaboration(collaborationId);
            fetchCollaborations();
        } catch (error) {
            console.error('Error deleting collaboration:', error);
        }
    };

    return (
        <div>
            <h2>Collaboration Panel</h2>
            <div>
                <input
                    type="text"
                    placeholder="User"
                    value={newCollaboration.user}
                    onChange={(e) => setNewCollaboration({ ...newCollaboration, user: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={newCollaboration.role}
                    onChange={(e) => setNewCollaboration({ ...newCollaboration, role: e.target.value })}
                />
                <button onClick={handleCreateCollaboration}>Add Collaboration</button>
            </div>
            <ul>
                {collaborations.map((collab) => (
                    <li key={collab.id}>
                        <span>{collab.user}</span> - <span>{collab.role}</span>
                        <button onClick={() => handleDeleteCollaboration(collab.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CollaborationPanel;
