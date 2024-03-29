import styled from 'styled-components/native';
import { colors } from 'styles';

export const Container = styled.View`
  padding: 16px;
`;

export const Content = styled.View`
  padding: 15px;
  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: #47474d;
  font-weight: bold;
  font-size: 15px;
`;

export const Description = styled.Text`
  color: ${colors.gray[600]};
  font-size: 14px;
  margin-top: 5px;
`;
