import styled from 'styled-components/native';

import { COLORS } from '../../styles/tokens';

export const Header = styled.View`
  width: 100%;
  padding: 20px 10px;

  background: ${COLORS.DARKEN_10};
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: 20px;
  font-weight: 600;
`;

export const Description = styled.Text`
  color: ${COLORS.FONT};
  margin-top: 20px;
  font-size: 15px;
  font-weight: 600;
`;
