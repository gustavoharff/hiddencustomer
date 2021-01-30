import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
