import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SPACING } from 'styles';

export const Container = styled.View`
  height: ${SPACING.L * 4.2}px;
  width: ${SPACING.L * 4.2}px;
  border-radius: ${(SPACING.L * 4.5) / 2}px;
  background: #dc1637;
  align-items: center;

  position: absolute;
  right: 4%;
  bottom: 4%;

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
`;

export const Button = styled(TouchableOpacity)`
  flex: 1;
  margin-top: auto;
  padding: ${SPACING.M}px;
  align-items: center;
  justify-content: center;
`;
