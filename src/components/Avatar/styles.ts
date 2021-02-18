import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

interface ImageProps {
  size: number;
}

export const Container = styled.View`
  /* margin-bottom: ${SPACING.L}px; */
`;

export const Image = styled.Image<ImageProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${(SPACING.M * 8) / 2}px;
  background: ${COLORS.DARKEN_10};
`;
