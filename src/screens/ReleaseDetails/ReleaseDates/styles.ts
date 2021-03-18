import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: ${Platform.OS === 'android' ? 'center' : 'stretch'};
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
