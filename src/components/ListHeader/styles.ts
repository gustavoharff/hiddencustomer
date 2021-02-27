import styled from 'styled-components/native';

import { COLORS } from 'styles';

export const Header = styled.View`
  width: 100%;
  padding: 20px 10px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 95%;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: 20px;
  font-weight: bold;
`;

export const Description = styled.Text`
  color: ${COLORS.FONT_LIGHT};
  margin-top: 20px;
  font-size: 15px;
  font-weight: bold;
`;
