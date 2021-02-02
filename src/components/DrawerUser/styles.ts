import styled from 'styled-components/native';

import { SPACING, COLORS } from '../../styles/tokens';

export const Container = styled.View`
  align-items: center;
  padding-left: ${SPACING.L}px;
  padding-right: ${SPACING.L}px;
  padding-top: ${SPACING.L}px;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT_SECONDARY};
  text-align: center;
  font-weight: 500;
`;

export const Text = styled.Text`
  color: ${COLORS.FONT_SECONDARY};
`;
