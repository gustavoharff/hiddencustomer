import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from '../../styles/tokens';

const DrawerRocketIcon: React.FC = () => (
  <View>
    <Icon name="rocket" color={COLORS.FONT} size={SPACING.L * 2} />
  </View>
);

export { DrawerRocketIcon };
