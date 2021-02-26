import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  height: ${SPACING.L * 4.5}px;
  width: ${SPACING.L * 4.5}px;
  border-radius: ${(SPACING.L * 4.5) / 2}px;
  background: ${COLORS.BACKGROUND};
  border: 1px solid ${COLORS.DARKEN_5};
  align-items: center;

  position: absolute;
  right: 4%;
  bottom: 4%;
`;

export const Button = styled(TouchableOpacity)`
  flex: 1;
  margin-top: auto;
  padding: ${SPACING.M}px;
  align-items: center;
  justify-content: center;
`;
