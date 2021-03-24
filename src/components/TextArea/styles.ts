import { StyleSheet } from 'react-native';

import { COLORS, SPACING } from 'styles';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
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
    borderColor: COLORS.ALERT,
    padding: 10,
    color: '#3d3d4d',
    fontFamily: 'Arial',
  },
});
