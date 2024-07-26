import React, { useState } from 'react';
import { Typography, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
  padding-top: 120px;
  overflow-y: auto;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  width: 100%;
  padding: 40px 20px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const ProjectCreationWizard = () => {
  const navigate = useNavigate();

  const [projectType, setProjectType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState({
    linkGitHub: false,
    linkIdeaApps: false,
    linkBankReferences: false
  });

  const allTeamMembers = [
    { label: "Miembro 1", value: "member1" },
    { label: "Miembro 2", value: "member2" },
    { label: "Miembro 3", value: "member3" }
  ];

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      setAdditionalInfo(prev => ({ ...prev, [name]: checked }));
    } else {
      switch (name) {
        case 'projectType':
          setProjectType(value);
          break;
        case 'projectName':
          setProjectName(value);
          break;
        case 'projectDescription':
          setProjectDescription(value);
          break;
        case 'objectives':
          setObjectives(value);
          break;
        default:
          // Si ninguna de las opciones anteriores, no hacer nada
          break;
      }
    }
  };

  const handleAutoCompleteChange = (event, newValue) => {
    setTeamMembers(newValue);
  };

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Crea tu Proyecto
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Proyecto</InputLabel>
          <Select name="projectType" value={projectType} onChange={handleInputChange}>
            <MenuItem value="programming">Programación</MenuItem>
            <MenuItem value="business">Servicios</MenuItem>
            <MenuItem value="financial">Finanzas</MenuItem>
            <MenuItem value="training">Entrenamiento</MenuItem>
            <MenuItem value="educational">Educativo</MenuItem>
            <MenuItem value="artistic">Artístico</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Proyecto"
          name="projectName"
          value={projectName}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descripción del Proyecto"
          name="projectDescription"
          value={projectDescription}
          multiline
          rows={4}
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox name="linkGitHub" checked={additionalInfo.linkGitHub} onChange={handleInputChange} />}
          label="¿Deseas enlazar tu proyecto con GitHub?"
        />
        <FormControlLabel
          control={<Checkbox name="linkIdeaApps" checked={additionalInfo.linkIdeaApps} onChange={handleInputChange} />}
          label="¿Deseas enlazar tu proyecto con aplicaciones de flujo de ideas?"
        />
        <FormControlLabel
          control={<Checkbox name="linkBankReferences" checked={additionalInfo.linkBankReferences} onChange={handleInputChange} />}
          label="¿Deseas enlazar tu proyecto con referencias de bancos en tiempo real?"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Objetivos del Proyecto"
          name="objectives"
          value={objectives}
          multiline
          rows={4}
          onChange={handleInputChange}
        />
        <Autocomplete
          multiple
          id="team-members-select"
          options={allTeamMembers}
          getOptionLabel={(option) => option.label}
          value={teamMembers}
          onChange={handleAutoCompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Selecciona Miembros del Equipo"
            />
          )}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/final')}
          sx={{ mt: 2 }}
        >
          Finalizar y Enviar
        </Button>
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default ProjectCreationWizard;
