import { StyleSheet } from 'react-native';
import { BODY, colors, SPACING } from 'styles';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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
