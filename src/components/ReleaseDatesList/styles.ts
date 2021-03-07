import styled from 'styled-components/native';

type ContentProps = {
  past: boolean;
};

export const Container = styled.View`
  padding: 16px;
`;

export const Content = styled.View<ContentProps>`
  padding: 15px;
  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
  border-bottom-color: ${props => (props.past ? '#ebebf0' : '#DC1637')};
`;

export const Date = styled.Text`
  color: #47474d;
  font-size: 15px;
`;
