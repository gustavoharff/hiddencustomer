import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import { SPACING } from 'styles';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: ${Platform.OS === 'android' ? 'center' : 'stretch'};

  justify-content: space-between;
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;

export const Label = styled.Text`
  width: 100%;
  color: #7a7a80;
  font-size: 16px;
  font-weight: 600;
  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.L}px;
  text-align: left;
`;
