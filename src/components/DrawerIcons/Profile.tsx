import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING, COLORS } from '../../styles/tokens';

const Profile: React.FC = () => (
  <View>
    <Icon
      name="account-edit"
      color={COLORS.FONT_SECONDARY}
      size={SPACING.L * 2}
    />
  </View>
);

export default Profile;
