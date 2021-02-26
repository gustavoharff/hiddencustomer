import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

export const UserInfo = styled.View`
  flex: 1;
  margin-left: 15px;
  text-align: left;
  justify-content: center;
`;

export const Container = styled.View`
  padding: ${SPACING.S}px ${SPACING.M}px;
`;

export const Content = styled.View`
  padding: ${SPACING.M}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${COLORS.BACKGROUND};
  border: 1px solid ${COLORS.FONT_LIGHTEST};
  border-radius: ${SPACING.M / 2}px;
`;

export const Name = styled.Text`
  color: ${COLORS.FONT};
`;

export const Email = styled.Text`
  color: ${COLORS.FONT_LIGHT};
  font-size: 13px;
  margin-top: 7px;
`;
