import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SPACING } from '../../styles/tokens';

const Home: React.FC = () => (
  <View>
    <Icon name="home" color={COLORS.FONT_SECONDARY} size={SPACING.L * 2} />
  </View>
);

export default Home;
