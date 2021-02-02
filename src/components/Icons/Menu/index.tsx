import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING, COLORS } from '../../../styles/tokens';

import { Container } from './styles';

const Menu: React.FC = () => (
  <Container>
    <Text>
      <Icon name="menu" color={COLORS.FONT} size={SPACING.L * 2} />
    </Text>
  </Container>
);

export default Menu;
