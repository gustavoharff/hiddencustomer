import styled from 'styled-components/native';
import { Form } from '@unform/mobile';

import { COLORS, SPACING } from 'styles';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const FieldDescription = styled.Text`
  width: 100%;
  color: ${COLORS.FONT_LIGHT};
  font-size: 16px;
  font-weight: 600;
  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.L}px;
  text-align: left;
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;
