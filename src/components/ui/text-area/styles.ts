import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { colors, COLORS, SPACING } from 'styles';

export const Container = styled.View`
  width: 90%;
  height: auto;
  min-height: 100px;

  border: 1px solid ${colors.gray[400]};

  margin-top: ${SPACING.L}px;
  margin-bottom: ${SPACING.L}px;

  background: ${colors.gray[50]};
`;

export const Label = styled.Text`
  width: 100%;

  text-align: left;

  color: ${colors.gray[600]};

  font-size: 16px;

  font-weight: 600;

  padding: ${SPACING.L}px ${SPACING.L}px 0 ${SPACING.L}px;
`;

export const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    borderWidth: 0,
    borderColor: COLORS.ALERT,
    padding: 10,
    color: '#3d3d4d',
    fontFamily: 'Arial',
  },
});
