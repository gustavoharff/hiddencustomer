import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

const BackHeaderIcon: React.FC<Props> = ({ onPress }) => (
  <View style={{ marginLeft: SPACING.S }}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="arrow-left" color="#DC1637" size={SPACING.L * 2} />
    </TouchableOpacity>
  </View>
);

export { BackHeaderIcon };
