import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING, COLORS } from '../../styles/tokens';

const DrawerProfileIcon: React.FC = () => (
  <View>
    <Icon
      name="account-edit-outline"
      color={COLORS.FONT_LIGHT}
      size={SPACING.L * 2}
    />
  </View>
);

export { DrawerProfileIcon };
