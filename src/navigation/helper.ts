import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { colors } from 'styles';

export const DEFAULT = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle: {
    backgroundColor: colors.white,
  },
  headerTitleAlign: 'center',
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontSize: 16,
  },
  headerStyle: {
    height: 64,
    backgroundColor: colors.gray[900],
    shadowColor: 'transparent',
    elevation: 0,
  },
} as StackNavigationOptions;

export const NO_HEADER = {
  headerShown: false,
} as StackNavigationOptions;
