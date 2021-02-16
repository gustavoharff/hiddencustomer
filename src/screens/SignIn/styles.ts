import { Form } from '@unform/mobile';
import styled from 'styled-components/native';
import { COLORS } from '../../styles/tokens';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background: ${COLORS.BACKGROUND_DARK};
`;

export const HeaderTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${COLORS.FONT};
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  font-family: 'Arial';
`;

export const HeaderContent = styled.Text`
  color: ${COLORS.FONT_LIGHT};
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  font-family: 'Arial';
`;

export const Unform = styled(Form)`
  width: 100%;
  align-items: center;
`;
