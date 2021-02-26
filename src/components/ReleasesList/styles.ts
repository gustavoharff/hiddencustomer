import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  padding: ${SPACING.S}px ${SPACING.M}px;
`;

export const Content = styled.View`
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND};
  border: 1px solid ${COLORS.FONT_LIGHTEST};
  border-radius: ${SPACING.M / 2}px;
`;

export const Name = styled.Text`
  color: ${COLORS.FONT};
  font-size: 15px;
`;
