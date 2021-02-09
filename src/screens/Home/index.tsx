import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import BottomButton from '../../components/BottomButton';
import ItemList from '../../components/ItemList';

import { Container } from './styles';
import { useCustomers } from '../../hooks/customers';
import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const { customers, setCustomers } = useCustomers();

  useEffect(() => {
    api.get('customers/me').then(response => {
      setCustomers(response.data);
    });
  }, [setCustomers]);

  const { user } = useAuth();

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <Container>
          <ItemList items={customers} />
        </Container>
      </ScrollView>
      {user.permission !== 'user' && (
        <BottomButton
          name="plus"
          onPress={() => navigation.navigate('AddCustomer')}
        />
      )}
    </>
  );
};

export default Home;
