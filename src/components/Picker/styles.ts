import { StyleSheet } from 'react-native';
import { BODY, colors } from 'styles';

export const styles = StyleSheet.create({
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
  selectContainer: {
    // alignItems: 'flex-end',
    // width: '100%',
  },
});
