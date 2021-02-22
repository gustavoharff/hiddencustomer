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
  border-radius: ${BODY.M.HEIGHT / 2}px;
  margin-bottom: ${SPACING.XL}px;
  margin-top: ${SPACING.XL}px;
  background: ${COLORS.BACKGROUND};

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
  color: ${COLORS.FONT};
  font-family: 'Arial';
`;
