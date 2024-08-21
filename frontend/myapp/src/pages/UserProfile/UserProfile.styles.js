import styled from 'styled-components';
import { Container, Box, Card } from '@mui/material';
import { colors } from '../../styles/Variables';

export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
`;

export const ProfileHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  h4 {
    margin-top: 20px;
    font-size: 32px;
    font-weight: bold;
  }

  p {
    margin-top: 10px;
    color: ${colors.secondary};
  }
`;

export const ProfileDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledCard = styled(Card)`
  background-color: ${colors.light};
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

export const InfoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);  // Aumentado el fondo oscuro para mejor contraste
  z-index: -1;
`;

export const LogoutButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;