import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import TaskList from './components/TaskList';
import CollaborationPanel from './components/CollaborationPanel';
import { getProjects } from './services/api';

const App = () => {
    const fetchProjects = async () => {
        try {
            await getProjects();
            // Asigna los datos del proyecto a alguna variable de estado si lo necesitas en el futuro
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/projects/:id" element={<ProjectPage fetchProjects={fetchProjects} />} />
                    <Route path="/" element={<HomePage fetchProjects={fetchProjects} />} />
                </Routes>
            </div>
        </Router>
    );
};

const HomePage = ({ fetchProjects }) => (
    <div>
        <h1>Home Page</h1>
        <ProjectForm fetchProjects={fetchProjects} />
    </div>
);

const ProjectPage = ({ fetchProjects }) => {
    const { id } = useParams();
    return (
        <div>
            <h1>Project Page</h1>
            <TaskList projectId={id} />
            <CollaborationPanel projectId={id} />
        </div>
    );
};

export default App;
