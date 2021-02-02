import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING, COLORS } from '../../../styles/tokens';

const Plus: React.FC = () => (
  <View>
    <Text>
      <Icon name="plus" color={COLORS.FONT} size={SPACING.L * 2} />
    </Text>
  </View>
);

export default Plus;
