import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  margin-bottom: ${SPACING.L};
`;

export const Image = styled.Image`
  height: ${SPACING.M * 8};
  width: ${SPACING.M * 8};
  border-radius: ${(SPACING.M * 8) / 2};
  background: ${COLORS.DARKEN_10};
`;
