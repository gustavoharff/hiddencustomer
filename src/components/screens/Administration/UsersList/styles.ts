import styled from 'styled-components/native';

export const UserInfo = styled.View`
  flex: 1;
  margin-left: 15px;
  text-align: left;
  justify-content: center;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 24px;
  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
`;

export const Name = styled.Text`
  color: #47474d;
`;

export const Email = styled.Text`
  color: #aeaeb3;
  font-size: 13px;
  margin-top: 7px;
`;
