import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled(TouchableOpacity)`
  padding: ${SPACING.M}px;
  padding-bottom: ${SPACING.M + getBottomSpace()}px;
  margin-top: auto;
  border-radius: 35px;
  height: 70px;
  width: 70px;
  background: ${COLORS.BACKGROUND_DARK};
  align-items: center;
  justify-content: center;

  margin-top: auto;
  margin-right: 30px;
  margin-bottom: 30px;
  margin-left: auto;
`;
