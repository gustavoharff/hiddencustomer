import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING } from '../../../styles/tokens';

import { Container } from './styles';

const Home: React.FC = () => (
  <Container>
    <Text>
      <Icon name="home" color={COLORS.FONT_SECONDARY} size={SPACING.L * 2} />
    </Text>
  </Container>
);

export default Home;
