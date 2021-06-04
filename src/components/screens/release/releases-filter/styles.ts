import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
`;

export const Item = styled.View`
  padding: 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 60px;

  background: #f4f5f6;
  border-bottom-width: 1px;
  border-bottom-color: #ebebf0;
`;

export const OptionText = styled.Text`
  max-width: 70%;
`;
