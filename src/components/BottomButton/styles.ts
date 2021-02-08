import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  height: ${SPACING.L * 4}px;
  width: ${SPACING.L * 4}px;
  border-radius: ${(SPACING.L * 4) / 2}px;
  background: ${COLORS.BACKGROUND_DARK};
  align-items: center;

  position: absolute;
  right: 2%;
  bottom: 2%;
`;

export const Button = styled(TouchableOpacity)`
  flex: 1;
  margin-top: auto;
  padding: ${SPACING.M}px;
  align-items: center;
  justify-content: center;
`;
