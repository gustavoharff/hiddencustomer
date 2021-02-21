import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { COLORS } from '../../styles/tokens';

export const StatusBar = styled.View`
  background: ${COLORS.BACKGROUND_DARK};
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight(true) : 0}px;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  background: ${COLORS.BACKGROUND_LIGHT};
`;
