import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Logo } from 'components';

import { Home, CustomerForm } from 'screens';

import { COLORS, SPACING } from 'styles';

const CustomersNavigator = createStackNavigator();

const CustomersRoutes: React.FC = () => (
  <CustomersNavigator.Navigator
    mode="modal"
    screenOptions={({ navigation }) => ({
      cardStyle: {
        backgroundColor: COLORS.BACKGROUND,
      },
      headerTitle: () => <Logo size={SPACING.XXL} />,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={{ marginLeft: SPACING.S }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" color={COLORS.FONT} size={SPACING.L * 2} />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: COLORS.FONT,
      headerStyle: {
        backgroundColor: COLORS.BACKGROUND_DARK,
      },
    })}
  >
    <CustomersNavigator.Screen name="Customers" component={Home} />
    <CustomersNavigator.Screen
      name="CustomerForm"
      component={CustomerForm}
      options={({ navigation }) => ({
        headerLeft: () => (
          <View style={{ marginLeft: SPACING.S }}>
            <TouchableOpacity onPress={() => navigation.navigate('Customers')}>
              <Icon name="close" color={COLORS.FONT} size={SPACING.L * 2} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
  </CustomersNavigator.Navigator>
);

export { CustomersRoutes };
