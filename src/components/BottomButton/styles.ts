import { StyleSheet } from 'react-native';

import { SPACING } from 'styles';

export const styles = StyleSheet.create({
  container: {
    height: SPACING.L * 4.2,
    width: SPACING.L * 4.2,
    borderRadius: (SPACING.L * 4.5) / 2,
    backgroundColor: '#dc1637',
    alignItems: 'center',

    position: 'absolute',
    right: '4%',
    bottom: '4%',
    elevation: 2,
  },
  button: {
    flex: 1,
    marginTop: 'auto',
    padding: SPACING.M,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
