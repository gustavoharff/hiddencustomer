import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

import { COLORS } from 'styles';

export const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;
