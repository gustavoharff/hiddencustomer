import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import BottomButton from '../../components/BottomButton';

import { Container } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <BottomButton />
    </Container>
  );
};

export default Home;
