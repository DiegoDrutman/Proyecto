import React, { useState } from 'react';
import { Typography, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #E5E4E2;
  color: #333;
  text-align: center;
  padding-top: 30px;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  width: 100%;
  padding: 40px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const ProjectCreationWizard = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        setRegistrationInfo({
          ...registrationInfo,
          [name]: value,
        });
        break;
    }
  };

  const handleTeamMembersChange = (event) => {
    setTeamMembers(event.target.value);
  };

  return (
    <FullScreenContainer>
      <ContentWrapper>
        {step === 1 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Selecciona el tipo de proyecto
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Proyecto</InputLabel>
              <Select name="projectType" value={projectType} onChange={handleInputChange}>
                <MenuItem value="programming">Programación</MenuItem>
                <MenuItem value="business">Servicios</MenuItem>
                <MenuItem value="financial">Finanzas</MenuItem>
                <MenuItem value="financial">Entrenamiento</MenuItem>
                <MenuItem value="financial">Educativo</MenuItem>
                <MenuItem value="financial">Artistico</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={handleNext}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Detalles del proyecto
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre del proyecto"
              name="projectName"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Descripción del proyecto"
              name="projectDescription"
              multiline
              rows={4}
              onChange={handleInputChange}
            />
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2 }}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 3 && projectType === 'programming' && (
          <div>
            <Typography variant="h4" gutterBottom>
              Configuración específica del proyecto
            </Typography>
            <FormControlLabel
              control={<Checkbox name="additionalInfo" value="linkGitHub" onChange={handleInputChange} />}
              label="¿Deseas enlazar tu proyecto con GitHub?"
            />
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2 }}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 3 && projectType === 'business' && (
          <div>
            <Typography variant="h4" gutterBottom>
              Configuración específica del proyecto
            </Typography>
            <FormControlLabel
              control={<Checkbox name="additionalInfo" value="linkIdeaApps" onChange={handleInputChange} />}
              label="¿Deseas enlazar tu proyecto con aplicaciones de flujo de ideas?"
            />
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2 }}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 3 && projectType === 'financial' && (
          <div>
            <Typography variant="h4" gutterBottom>
              Configuración específica del proyecto
            </Typography>
            <FormControlLabel
              control={<Checkbox name="additionalInfo" value="linkBankReferences" onChange={handleInputChange} />}
              label="¿Deseas enlazar tu proyecto con referencias de bancos en tiempo real?"
            />
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2 }}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 4 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Información adicional
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Objetivos del proyecto"
              name="objectives"
              multiline
              rows={4}
              onChange={handleInputChange}
            />
            <Typography variant="h6" gutterBottom>
              Miembros del equipo
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Selecciona Miembro del Equipo</InputLabel>
              <Select
                name="teamMembers"
                multiple
                value={teamMembers}
                onChange={handleTeamMembersChange}
              >
                <MenuItem value="member1">Miembro 1</MenuItem>
                <MenuItem value="member2">Miembro 2</MenuItem>
                <MenuItem value="member3">Miembro 3</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/collaborations')}
              sx={{ mt: 2 }}
            >
              Agregar Miembros
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ mt: 2 }}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2, mt: 2 }}>
              Siguiente
            </Button>
          </div>
        )}

        {step === 5 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Resumen del proyecto
            </Typography>
            <Typography variant="body1">Tipo de proyecto: {projectType}</Typography>
            <Typography variant="body1">Nombre del proyecto: {projectName}</Typography>
            <Typography variant="body1">Descripción del proyecto: {projectDescription}</Typography>
            <Typography variant="body1">Objetivos: {objectives}</Typography>
            <Typography variant="body1">Miembros del equipo: {teamMembers.join(', ')}</Typography>
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/signup')} sx={{ ml: 2 }}>
              Confirmar
            </Button>
          </div>
        )}

        {step === 6 && (
          <div>
            <Typography variant="h4" gutterBottom>
              Registro
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre de Usuario"
              name="username"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              onChange={handleInputChange}
            />
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Atrás
            </Button>
            <Button variant="contained" color="secondary" onClick={handleNext} sx={{ ml: 2 }}>
              Registrarse
            </Button>
          </div>
        )}
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default ProjectCreationWizard;
