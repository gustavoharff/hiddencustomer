import styled, { css } from 'styled-components/native';

interface ContainerProps {
  flex?: boolean;
  alignCenter?: boolean;
  justifyCenter?: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}

  ${({ flex }) =>
    flex &&
    css`
      flex: 1;
    `}

    ${({ justifyCenter }) =>
    justifyCenter &&
    css`
      justify-content: center;
    `}
`;
