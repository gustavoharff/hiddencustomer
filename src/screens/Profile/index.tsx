import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text>Profile</Text>

      <TouchableOpacity onPress={signOut}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Profile;
