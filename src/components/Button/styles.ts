import styled from 'styled-components/native';
import { shade } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

import { COLORS, BODY, SPACING } from '../../styles/tokens';

export const Container = styled(RectButton)`
  width: 90%;
  margin-top: 10px;
  height: ${SPACING.XXL * 2}px;
  background: ${COLORS.WHITE};
  border-radius: ${BODY.S.HEIGHT}px;
  border: 1px solid ${shade(0.2, COLORS.WHITE)};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${COLORS.BACKGROUND_DARK};
  font-family: 'Arial';
  font-weight: bold;
`;
