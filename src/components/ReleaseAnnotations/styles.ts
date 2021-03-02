import styled from 'styled-components/native';
import { BODY, COLORS, SPACING } from 'styles';

export const Container = styled.View`
  flex: 1;
  padding: ${SPACING.L}px;
`;

export const Annotation = styled.Text`
  color: ${COLORS.WHITE};

  background: ${COLORS.BACKGROUND};
  padding: ${SPACING.L}px;

  border-width: 1px;
  border-color: ${COLORS.FONT_LIGHT};
  border-style: solid;
  border-radius: ${BODY.M.HEIGHT / 2}px;
`;
