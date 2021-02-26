import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from '../../styles/tokens';

const DrawerAdminIcon: React.FC = () => (
  <View>
    <Icon
      name="account-cog-outline"
      color={COLORS.ALERT}
      size={SPACING.L * 2}
    />
  </View>
);

export { DrawerAdminIcon };
