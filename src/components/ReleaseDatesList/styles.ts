import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

type DateProps = {
  past: boolean;
};

export const Container = styled.View`
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND_LIGHT};
  border-bottom-width: 1px;
  border-color: ${COLORS.DARKEN_15};
`;

export const Date = styled.Text<DateProps>`
  color: ${props => (props.past ? COLORS.FONT_LIGHT : COLORS.FONT)};
  font-size: 15px;
`;
