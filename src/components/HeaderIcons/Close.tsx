import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

const CloseHeaderIcon: React.FC<Props> = ({ onPress }) => (
  <View style={{ marginLeft: SPACING.S }}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="close" color={COLORS.FONT} size={SPACING.L * 2} />
    </TouchableOpacity>
  </View>
);

export { CloseHeaderIcon };
