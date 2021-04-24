import styled, { css } from 'styled-components/native';

interface ContainerProps {
  past: boolean;
}

interface BottomContentProps {
  between: boolean;
  past: boolean;
}

export const Container = styled.View<ContainerProps>`
  padding: 16px;

  ${props =>
    props.past &&
    css`
      opacity: 0.7;
    `}
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

export const BottomContent = styled.View<BottomContentProps>`
  padding: 10px 24px;
  background: #f4f5f6;

  ${props =>
    props.between &&
    css`
      background: #daf3e5;
    `}

  ${props =>
    props.past &&
    css`
      opacity: 0.7;
    `}

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
