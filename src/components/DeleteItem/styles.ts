import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled(RectButton)`
  width: ${SPACING.XXL * 3}px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.ALERT};
`;

export const Text = styled.Text`
  color: ${COLORS.FONT};
`;
