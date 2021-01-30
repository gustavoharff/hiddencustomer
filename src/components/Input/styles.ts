import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-bottom-width: 1px;
  border-color: rgb(0, 91, 126);
  border-style: solid;
  margin-bottom: 8px;
  max-width: 350px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  ${props =>
    props.isFocused &&
    css`
      border-bottom-width: 4px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  border: 0;
  color: #fff;
  font-family: 'Arial';
`;
