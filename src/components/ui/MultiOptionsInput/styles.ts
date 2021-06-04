import styled, { css } from 'styled-components/native';
import { colors, SPACING } from 'styles';

interface ItemProps {
  selected: boolean;
}

interface ItemTextProps {
  selected: boolean;
}

export const Label = styled.Text`
  width: 100%;

  color: ${colors.gray[600]};

  font-size: 16px;
  text-align: left;
  font-weight: 600;

  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.XL}px;

  margin-bottom: ${SPACING.S}px;
`;

export const Container = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-between;

  margin-left: 20px;
  margin-right: 20px;
`;

export const Item = styled.TouchableOpacity<ItemProps>`
  flex: 1;
  padding: 16px;

  align-items: center;
  justify-content: center;

  ${props =>
    props.selected &&
    css`
      background-color: ${colors.gray[900]};
    `}

  border-width: 1px;
  border-color: ${colors.gray[400]};
`;

export const ItemText = styled.Text<ItemTextProps>`
  ${props =>
    props.selected
      ? css`
          color: ${colors.white};
        `
      : css`
          color: ${colors.black};
        `}
`;
