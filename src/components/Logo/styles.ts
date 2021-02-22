import styled from 'styled-components/native';

type ImageProps = {
  size: number;
};

export const Image = styled.Image<ImageProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;
