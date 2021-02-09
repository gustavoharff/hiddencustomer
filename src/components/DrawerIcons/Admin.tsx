import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from '../../styles/tokens';

const Admin: React.FC = () => (
  <View>
    <Icon
      name="account-cog"
      color={COLORS.FONT_SECONDARY}
      size={SPACING.L * 2}
    />
  </View>
);

export default Admin;
