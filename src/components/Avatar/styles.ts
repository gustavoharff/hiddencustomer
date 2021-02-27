import styled from 'styled-components/native';

import { COLORS } from 'styles';

type ImageProps = {
  size: number;
};

export const Image = styled.Image<ImageProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background: ${COLORS.DARKEN_10};
`;
