import styled from 'styled-components/native';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  padding-left: ${SPACING.L}px;
  height: ${SPACING.S * 8}px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
`;

export const Content = styled.View`
  flex: 1;
  height: 100%;
  padding: 10px;
  padding-top: 20px;
  justify-content: center;
`;
