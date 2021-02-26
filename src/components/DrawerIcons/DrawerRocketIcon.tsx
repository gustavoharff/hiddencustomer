import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from '../../styles/tokens';

const DrawerRocketIcon: React.FC = () => (
  <View>
    <Icon name="rocket-outline" color={COLORS.ALERT} size={SPACING.L * 2} />
  </View>
);

export { DrawerRocketIcon };
