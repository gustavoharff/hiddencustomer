import styled from 'styled-components/native';

import { colors } from 'styles';

export const Header = styled.View`
  width: 100%;
  padding: 20px 10px;
  justify-content: center;
  align-items: center;
  background: ${colors.gray[850]};
`;

export const Content = styled.View`
  width: 95%;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
`;

export const Description = styled.Text`
  color: ${colors.gray[400]};
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;
