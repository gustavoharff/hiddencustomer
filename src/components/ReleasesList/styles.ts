import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  padding: ${SPACING.M}px;
  background: ${COLORS.BACKGROUND_LIGHT};
  border-bottom-width: 1px;
  border-color: ${COLORS.DARKEN_15};
`;

export const Name = styled.Text`
  color: ${COLORS.FONT};
`;

export const UpdatedAt = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const UpdatedAtText = styled.Text`
  color: ${COLORS.FONT_LIGHT};
`;