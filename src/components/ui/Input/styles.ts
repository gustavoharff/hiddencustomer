import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { COLORS, SPACING, BODY, colors } from 'styles';

export const Container = styled.View`
  width: 90%;
  height: ${BODY.M.HEIGHT * 2}px;

  border: 1px solid ${colors.gray[400]};

  margin-top: ${SPACING.S}px;
  margin-bottom: ${SPACING.L}px;
`;

export const Label = styled.Text`
  width: 100%;

  color: ${colors.gray[600]};

  font-size: 16px;

  text-align: left;

  font-weight: 600;

  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.XL}px;
`;

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    borderWidth: 0,
    borderColor: COLORS.FONT_SECONDARY,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#3d3d4d',
  },
});
