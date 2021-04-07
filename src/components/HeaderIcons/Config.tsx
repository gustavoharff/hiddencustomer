import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING } from 'styles';

type Props = {
  onPress?: () => void;
};

export function ConfigHeaderIcon({ onPress }: Props) {
  return (
    <View style={{ marginRight: SPACING.L }}>
      <TouchableOpacity onPress={onPress}>
        <Icon name="cog-outline" color="#DC1637" size={SPACING.L * 2} />
      </TouchableOpacity>
    </View>
  );
}
