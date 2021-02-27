import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

type ContentProps = {
  past: boolean;
};

export const Container = styled.View`
  padding: ${SPACING.S}px ${SPACING.M}px;
`;

export const Content = styled.View<ContentProps>`
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND};
  border: 1px solid ${COLORS.FONT_LIGHTEST};
  border-radius: ${SPACING.M / 2}px;
  opacity: ${props => (props.past ? 0.3 : 1)};
`;
export const Date = styled.Text`
  color: ${COLORS.FONT};
  font-size: 15px;
`;

/* color: ${props => (props.past ? COLORS.FONT_LIGHT : COLORS.FONT)}; */
