import styled, { css } from 'styled-components/native';

import { COLORS, SPACING } from '../../styles/tokens';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 90%;
  height: 60px;
  border-bottom-width: 1px;
  border-color: ${COLORS.FONT_LIGHT};
  border-style: solid;
  margin-bottom: ${SPACING.XL}px;

  ${props =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  border: 0;
  color: ${COLORS.FONT};
  font-family: 'Arial';
`;
