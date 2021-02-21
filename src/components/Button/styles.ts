import styled from 'styled-components/native';
import { shade } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

import { COLORS, BODY, SPACING } from '../../styles/tokens';

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

  background: ${props => props.backgroundColor || COLORS.WHITE};
  border-radius: ${BODY.S.HEIGHT}px;
  border: 1px solid
    ${props => shade(0.2, props.backgroundColor || COLORS.WHITE)};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${props => props.textColor || COLORS.BACKGROUND_DARK};
  font-family: 'Arial';
  font-weight: bold;
`;
