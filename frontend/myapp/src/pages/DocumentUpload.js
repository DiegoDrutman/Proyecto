import React, { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Animación de entrada
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Colores y tipografía
const colors = {
  primary: '#004080',
  secondary: '#2196f3',
  light: '#fff',
  dark: '#000',
};

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: ${colors.light};
  color: ${colors.dark};
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
  background-color: ${colors.light};
  border-radius: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: ${colors.primary};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.primary};
  color: ${colors.light};
  &:hover {
    background-color: ${colors.secondary};
  }
`;

const FileDropArea = styled(Box)`
  border: 2px dashed ${colors.primary};
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  color: ${colors.primary};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.light};
  }
`;

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentFile, setDocumentFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'documentName') {
      setDocumentName(value);
    } else if (name === 'documentDescription') {
      setDocumentDescription(value);
    }
  };

  const handleFileChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDocumentFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (documentFile) {
      // Aquí iría la lógica para manejar la carga del documento al servidor
      const formData = new FormData();
      formData.append('documentName', documentName);
      formData.append('documentDescription', documentDescription);
      formData.append('documentFile', documentFile);

      // Aquí puedes hacer la llamada al servidor usando fetch o axios
      console.log('Documento Enviado:', documentName, documentDescription, documentFile);

      navigate('/document-list'); // Redirigir al usuario a la lista de documentos
    } else {
      alert('Por favor, adjunta un archivo antes de enviar.');
    }
  };

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>Cargar Documento</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Documento"
          name="documentName"
          value={documentName}
          onChange={handleInputChange}
        />
        <FileDropArea
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <Typography variant="h6">Selecciona un archivo o arrastra y suelta aquí</Typography>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx,.txt"  // Puedes ajustar esto según los tipos de archivos permitidos
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {documentFile && <Typography variant="body2">{documentFile.name}</Typography>}
        </FileDropArea>
        <TextField
          fullWidth
          margin="normal"
          label="Descripción del Documento"
          name="documentDescription"
          value={documentDescription}
          multiline
          rows={4}
          onChange={handleInputChange}
        />
        <StyledButton variant="contained" onClick={handleSubmit}>
          Cargar y Enviar
        </StyledButton>
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default DocumentUpload;