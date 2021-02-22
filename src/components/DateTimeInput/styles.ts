import styled from 'styled-components/native';

import { BODY, COLORS, SPACING } from 'styles';

export const Container = styled.View`
  justify-content: center;
  padding: 10px;
`;

export const Content = styled.View`
  flex-direction: row;
`;

export const DateText = styled.Text`
  text-align: center;
  color: ${COLORS.FONT};
  font-size: ${BODY.M.SIZE}px;
  padding: 10px;
  background: ${COLORS.BACKGROUND_LIGHT};
  border-radius: ${SPACING.S}px;
`;

export const TimeText = styled.Text`
  text-align: center;
  color: ${COLORS.FONT};
  font-size: ${BODY.M.SIZE}px;
  padding: 10px;
  background: ${COLORS.BACKGROUND_LIGHT};
  border-radius: ${SPACING.S}px;
  margin-left: ${SPACING.M}px;
`;
