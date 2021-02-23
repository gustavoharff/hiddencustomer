import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  flex: 1;
  padding: 10px;

  justify-content: space-between;
`;

export const Title = styled.Text`
  padding: 0 ${SPACING.L}px;
  color: ${COLORS.FONT};
  font-size: 20px;
  font-weight: 600;
`;

export const Text = styled.Text`
  color: ${COLORS.FONT};
  padding: 0 ${SPACING.L}px;
  font-size: 15px;
  font-weight: normal;
  margin-top: 10px;
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;
