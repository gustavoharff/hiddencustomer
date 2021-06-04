import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { SPACING, colors } from 'styles';

interface ContainerProps {
  color: string;
}
interface TextProps {
  color: 'dark' | 'light';
}

export const Container = styled(RectButton)<ContainerProps>`
  width: ${SPACING.XXL * 3}px;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color};
`;

export const Text = styled.Text<TextProps>`
  color: ${({ color }) =>
    color === 'light' ? colors.gray[50] : colors.gray[900]};
`;
