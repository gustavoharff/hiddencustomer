import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND_LIGHT};
  border-bottom-width: 1px;
  border-color: ${COLORS.DARKEN_15};
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 15px;
  text-align: left;
  justify-content: center;
`;

export const Name = styled.Text`
  color: ${COLORS.FONT};
`;

export const Email = styled.Text`
  color: ${COLORS.FONT_LIGHT};
  font-size: 13px;
  margin-top: 7px;
`;

export const UpdatedAt = styled.View`
  margin-top: 7px;
  flex-direction: row;
  justify-content: space-between;
`;

export const UpdatedAtText = styled.Text`
  color: ${COLORS.FONT_LIGHTEST};
`;
