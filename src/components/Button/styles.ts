import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { colors, SPACING } from 'styles';

interface ContainerProps {
  backgroundColor?: string;
}

interface ButtonTextProps {
  textColor?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 90%;
  height: ${SPACING.XXL * 2}px;

  margin-top: 10px;

  background: ${props => props.backgroundColor || colors.red[500]};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${props => props.textColor || colors.white};
`;

export const MaxWidth = styled.View`
  width: 100%;
  align-items: center;
`;
