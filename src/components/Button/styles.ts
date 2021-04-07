import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { SPACING } from 'styles';

interface ContainerProps {
  backgroundColor?: string;
}

interface ButtonTextProps {
  textColor?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 90%;
  margin-top: 10px;
  height: ${SPACING.XXL * 2}px;

  background: ${props => props.backgroundColor || '#DC1637'};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${props => props.textColor || '#fff'};
  font-family: 'Arial';
`;
