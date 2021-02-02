import styled from 'styled-components/native';
import { shade } from 'polished';
import { RectButton } from 'react-native-gesture-handler';
import { COLORS } from '../../styles/tokens';

export const Container = styled(RectButton)`
  width: 100%;
  max-width: 350px;
  margin-top: 10px;
  height: 40px;
  background: ${COLORS.WHITE};
  border-radius: 9px;
  border: 1px solid ${shade(0.2, COLORS.WHITE)};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${COLORS.BACKGROUND_DARK};
  font-family: 'Arial';
  font-weight: 500;
`;
