import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

import { COLORS } from '../../styles/tokens';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: 20px;
  font-weight: 600;
`;

export const Text = styled.Text`
  color: ${COLORS.FONT};
  font-size: 15px;
  font-weight: normal;
  margin-top: 10px;
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;
