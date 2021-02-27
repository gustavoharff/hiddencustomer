import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

const LoggoutHeaderIcon: React.FC<Props> = ({ onPress }) => (
  <View style={{ marginRight: SPACING.S }}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="exit-to-app" color={COLORS.ALERT} size={SPACING.L * 2} />
    </TouchableOpacity>
  </View>
);

export { LoggoutHeaderIcon };
