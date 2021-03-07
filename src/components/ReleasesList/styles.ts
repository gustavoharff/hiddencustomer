import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
`;

export const Top = styled.View``;

export const Content = styled.View`
  padding: 24px;
  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
`;

export const Title = styled.Text`
  color: #aeaeb3;
  font-size: 15px;
  text-transform: uppercase;
`;

export const Description = styled.Text`
  color: #47474d;
  font-weight: bold;
  font-size: 15px;
  margin-top: 5px;
`;

export const Item = styled.View`
  margin-top: 17px;
`;

export const Bottom = styled.View`
  margin-top: 5px;
`;

export const BottomContent = styled.View`
  padding: 10px 24px;
  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
  flex-direction: row;
  justify-content: space-between;
`;

export const TimeContent = styled.View`
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
`;

export const TimeText = styled.Text`
  color: #47474d;
`;
