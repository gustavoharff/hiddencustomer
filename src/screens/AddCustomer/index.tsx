import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, Text, Unform } from './styles';
import api from '../../services/api';

import { useCustomers } from '../../hooks/customers';

const AddCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { setCustomers } = useCustomers();

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('E-mail obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.post('/customers', {
          name: data.name,
        });

        setCustomers(state => [response.data, ...state]);

        navigation.navigate('Home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
        }
      }
    },
    [setCustomers, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Title>Adicionar cliente</Title>
          <Text>Adicione um cliente á sua lista de clientes.</Text>
          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" />

            <Button
              title="Enviar"
              onPress={() => formRef.current?.submitForm()}
            />
          </Unform>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCustomer;
