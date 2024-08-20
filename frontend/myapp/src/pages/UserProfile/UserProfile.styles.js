import styled from 'styled-components';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { colors } from '../../styles/Variables';

export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  min-height: calc(100vh - 200px);
`;

export const ProfileTitle = styled(Typography)`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px; 
  color: ${colors.dark};
  text-align: center;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 40px; /* Aumentar aún más el espaciado */
  .MuiInputBase-root {
    background-color: ${colors.light};
  }
  .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 18px;
  }
`;

export const UpdateButton = styled(Button)`
  background-color: ${colors.primary};
  color: ${colors.light};
  padding: 15px 40px;
  font-size: 22px;
  margin-top: 40px; /* Ajuste de margen superior */
  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const HoursContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px; /* Aumentar espaciado entre filas */
  flex-wrap: wrap;
`;

export const HoursTextField = styled(TextField)`
  width: 48%;
  .MuiInputBase-root {
    background-color: ${colors.light};
  }
  .MuiOutlinedInput-root {
    border-radius: 10px;
    font-size: 18px;
  }
`;

export const Divider = styled(Box)`
  width: 100%;
  height: 2px;
  background-color: ${colors.secondary};
  margin: 40px 0;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

export const LogoContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;
  