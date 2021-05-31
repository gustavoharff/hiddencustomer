import styled, { css } from 'styled-components/native';

interface ContainerProps {
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ justifyCenter }) =>
    justifyCenter &&
    css`
      justify-content: center;
    `}

  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}
`;
