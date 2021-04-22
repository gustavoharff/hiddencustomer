import styled from 'styled-components/native';

interface ImageProps {
  size: number;
}

export const Image = styled.Image<ImageProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
