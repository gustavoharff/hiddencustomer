import styled from 'styled-components/native';
import { SPACING } from 'styles';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  width: 100%;
  background: #333;
  font-size: 18px;
  font-weight: bold;
  color: #f4f4f4;
  padding: ${SPACING.L}px ${SPACING.L}px ${SPACING.L}px ${SPACING.L}px;
  text-align: left;
`;

export const FieldDescription = styled.Text`
  width: 100%;
  color: #7a7a80;
  font-size: 16px;
  font-weight: 500;
  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.L}px;
  text-align: left;
`;

export const Text = styled.Text`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  color: #3d3d4d;
  padding: ${SPACING.S}px ${SPACING.L}px 0 ${SPACING.L}px;
  text-align: left;
`;
