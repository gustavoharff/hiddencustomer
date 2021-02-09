import styled from 'styled-components/native';

import { COLORS } from '../../styles/tokens';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Header = styled.View`
  padding: 20px 10px;

  background: ${COLORS.DARKEN_10};
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: 20px;
  font-weight: 600;
`;
