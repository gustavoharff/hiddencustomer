import styled from 'styled-components/native';
import { shade } from 'polished';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, BODY } from '../../styles/tokens';

export const Container = styled(TouchableOpacity)`
  width: ${BODY.L.SIZE * 8}px;
  margin-top: 10px;
  height: 40px;
  background: ${COLORS.WHITE};
  border-radius: ${BODY.S.HEIGHT}px;
  border: 1px solid ${shade(0.2, COLORS.WHITE)};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${COLORS.BACKGROUND_DARK};
  font-family: 'Arial';
  font-weight: 500;
`;
