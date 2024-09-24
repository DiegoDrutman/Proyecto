import styled from 'styled-components';
import { Typography } from '@mui/material';
import { colors } from '../../styles/Variables';

export const NavBar = styled.div`
  background-color: ${(props) => (props.$scrolled ? colors.dark : colors.light)};
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
  padding: 8px 20px;
  height: 60px;

  @media (max-width: 768px) {
    padding: 6px 15px;
    height: 50px;
  }
`;

export const NavLink = styled(Typography)`
  color: ${colors.dark} !important;
  font-family: 'Lato', sans-serif !important;
  font-weight: bold !important;
  font-size: 0.8rem !important;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  padding-bottom: 5px;
  text-transform: uppercase;
  margin: 0 15px;

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${colors.dark} !important;
    transition: width 0.3s;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: ${colors.accent} !important;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem !important;
    margin: 0 10px !important;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem !important;
    margin: 0 8px !important;
  }
`;

export const IngresarLink = styled(NavLink)`
  border: 1px solid ${colors.dark} !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  margin-left: 10px !important;
  position: relative !important;
  z-index: 9999 !important;

  &:after {
    display: none !important;
  }

  &:hover {
    background-color: ${colors.accent} !important;
    color: ${colors.light} !important;
    transform: scale(1.05) !important;
  }

  @media (max-width: 768px) {
    padding: 8px 15px !important;
    font-size: 0.9rem !important;
  }

  @media (max-width: 480px) {
    padding: 7px 12px !important;
    font-size: 0.8rem !important;
  }
`;
