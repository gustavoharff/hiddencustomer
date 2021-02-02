import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SPACING, COLORS } from '../../../styles/tokens';

import { Container } from './styles';

const Profile: React.FC = () => (
  <Container>
    <Text>
      <Icon
        name="account-edit"
        color={COLORS.FONT_SECONDARY}
        size={SPACING.L * 2}
      />
    </Text>
  </Container>
);

export default Profile;
