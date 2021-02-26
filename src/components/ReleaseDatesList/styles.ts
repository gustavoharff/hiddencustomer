import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

type DateProps = {
  past: boolean;
};

export const Container = styled.View`
  padding: ${SPACING.S}px ${SPACING.M}px;
`;

export const Content = styled.View`
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND};
  border: 1px solid ${COLORS.FONT_LIGHTEST};
  border-radius: ${SPACING.M / 2}px;
`;
export const Date = styled.Text<DateProps>`
  color: ${props => (props.past ? COLORS.FONT_LIGHT : COLORS.FONT)};
  font-size: 15px;
`;
