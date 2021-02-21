import styled from 'styled-components/native';
import { COLORS, SPACING } from '../../styles/tokens';

export const Container = styled.View`
  margin-top: auto;
  margin-bottom: ${SPACING.L}px;
  padding-left: ${SPACING.L}px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${COLORS.FONT};
  font-size: ${SPACING.L}px;
  text-align: center;
  margin-top: ${SPACING.S}px;
`;

export const Version = styled.Text`
  color: ${COLORS.FONT};
  font-size: ${SPACING.M}px;
  text-align: center;
  margin-top: ${SPACING.S}px;
`;
