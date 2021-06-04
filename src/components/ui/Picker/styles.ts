import { StyleSheet } from 'react-native';
import { BODY, colors, SPACING } from 'styles';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray[400],
    width: '90%',
    marginHorizontal: 20,
    marginBottom: SPACING.L,
  },
  label: {
    width: '100%',
    color: colors.gray[600],
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '600',
    paddingTop: SPACING.L,
    paddingRight: SPACING.L,
    paddingBottom: 0,
    paddingLeft: SPACING.XL,
    marginBottom: SPACING.S,
  },
  selectIOS: {
    height: 50,
    marginLeft: 17,
    fontWeight: '500',
    color: colors.gray[600],
    fontSize: BODY.M.SIZE,
  },
  selectAndroid: {
    height: 50,
    width: 150,
    fontWeight: '500',
    color: colors.gray[600],
  },
});
