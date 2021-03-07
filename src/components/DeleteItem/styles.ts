import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { COLORS, SPACING } from 'styles';

export const Container = styled(RectButton)`
  width: ${SPACING.XXL * 3}px;
  align-items: center;
  justify-content: center;
  background: #dc1637;
`;

export const Text = styled.Text`
  color: ${COLORS.FONT};
`;
