import { StyleSheet } from 'react-native';

import { COLORS, SPACING, BODY } from 'styles';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: BODY.M.HEIGHT * 2,
    borderWidth: 1,
    borderColor: COLORS.FONT_LIGHT,
    borderStyle: 'solid',
    marginTop: SPACING.L,
    marginBottom: SPACING.L,
    backgroundColor: '#f2f2fa',
  },
  input: {
    flex: 1,
    fontSize: 15,
    borderWidth: 0,
    borderColor: COLORS.BACKGROUND_DARK,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#3d3d4d',
    fontFamily: 'Arial',
  },
  label: {
    width: '100%',
    color: '#7a7a80',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: SPACING.L,
    paddingRight: SPACING.L,
    paddingBottom: 0,
    paddingLeft: SPACING.L,
  },
});
