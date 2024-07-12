import React, { useState } from 'react';
import { createProject } from '../services/api';

const ProjectForm = ({ fetchProjects }) => {
    const [project, setProject] = useState({ title: '', description: '', start_date: '', end_date: '', user: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Creating project:', project); // Verifica los datos antes de enviarlos
        try {
            await createProject(project);
            fetchProjects();
            setProject({ title: '', description: '', start_date: '', end_date: '', user: 1 });
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error creating project:', error.response.data); // Imprime los datos de error
            } else {
                console.error('Error creating project:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
            <input
                type="date"
                placeholder="Start Date"
                value={project.start_date}
                onChange={(e) => setProject({ ...project, start_date: e.target.value })}
            />
            <input
                type="date"
                placeholder="End Date"
                value={project.end_date}
                onChange={(e) => setProject({ ...project, end_date: e.target.value })}
            />
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectForm;
