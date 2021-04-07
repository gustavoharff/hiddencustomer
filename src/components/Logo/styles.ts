import styled from 'styled-components/native';

interface ImageProps {
  size: number;
}

export const Image = styled.Image<ImageProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;
