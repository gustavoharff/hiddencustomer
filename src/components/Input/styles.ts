import styled, { css } from 'styled-components/native';

import { COLORS, SPACING, BODY } from 'styles';

type ContainerProps = {
  isFocused: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 90%;
  height: ${BODY.M.HEIGHT * 2}px;
  border-width: 1px;
  border-color: ${COLORS.FONT_LIGHT};
  border-style: solid;
  margin-bottom: ${SPACING.L}px;
  margin-top: ${SPACING.L}px;
  background: #f2f2fa;

  ${props =>
    props.isFocused &&
    css`
      border-width: 2px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  border: 0;
  padding: 5px 15px;
  color: #3d3d4d;
  font-family: 'Arial';
`;
