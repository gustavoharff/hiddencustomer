import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from 'styles';

const DrawerCustomersIcon: React.FC = () => (
  <View>
    <Icon
      name="account-group-outline"
      color={COLORS.ALERT}
      size={SPACING.L * 2}
    />
  </View>
);

export { DrawerCustomersIcon };
