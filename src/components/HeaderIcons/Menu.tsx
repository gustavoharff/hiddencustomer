import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS, SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

const MenuHeaderIcon: React.FC<Props> = ({ onPress }) => (
  <View style={{ marginLeft: SPACING.S }}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="menu-outline" color={COLORS.WHITE} size={SPACING.L * 2} />
    </TouchableOpacity>
  </View>
);

export { MenuHeaderIcon };
