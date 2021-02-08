import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  margin-bottom: ${SPACING.L}px;
`;

export const Image = styled.Image`
  height: ${SPACING.M * 8}px;
  width: ${SPACING.M * 8}px;
  border-radius: ${(SPACING.M * 8) / 2}px;
  background: ${COLORS.DARKEN_10};
`;
