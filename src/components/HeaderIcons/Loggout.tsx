import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

const LoggoutHeaderIcon: React.FC<Props> = ({ onPress }) => (
  <View style={{ marginRight: SPACING.L }}>
    <TouchableOpacity onPress={onPress}>
      <Icon name="exit-to-app" color="#DC1637" size={SPACING.L * 2} />
    </TouchableOpacity>
  </View>
);

export { LoggoutHeaderIcon };
