import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { colors, SPACING } from 'styles';

export const Container = styled.View`
  width: ${SPACING.L * 4.2}px;
  height: ${SPACING.L * 4.2}px;

  border-radius: ${(SPACING.L * 4.5) / 2}px;

  background: ${colors.red[500]};

  align-items: center;

  position: absolute;
  right: 4%;
  bottom: 4%;

  z-index: 2;

  box-shadow: 2px 2px 5px ${colors.gray[600]};
`;

export const Button = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;

  margin-top: auto;
  padding: ${SPACING.M}px;
`;
