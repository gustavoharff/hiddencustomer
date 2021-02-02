import styled from 'styled-components/native';

interface ImageProps {
  size: number | string;
}
export const Image = styled.Image<ImageProps>`
  width: ${props => props.size};
  height: ${props => props.size};
`;
