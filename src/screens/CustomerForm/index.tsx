import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Input, Button, ListHeader } from 'components';

import { api, getRealm } from 'services';

import { useCustomers } from 'hooks';

import { COLORS, SPACING } from 'styles';

import { Container, FieldDescription, Unform } from './styles';

const CustomerForm: React.FC = () => {
  const [loadingButton, setLoadingButton] = useState(false);
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

        const realm = await getRealm();

        realm.write(() => {
          realm.create('Customer', response.data);
        });

        navigation.navigate('Customers');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
    },
    [setCustomers, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(false) + SPACING.L * 2
      }
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <View>
            <ListHeader title="Registrar cliente" />

            <Unform ref={formRef} onSubmit={handleSubmit}>
              <FieldDescription>Informe o nome do cliente:</FieldDescription>
              <Input
                name="name"
                placeholder="Nome do cliente"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Enviar"
              loading={loadingButton}
              onPress={() => {
                formRef.current?.submitForm();
                setLoadingButton(true);
              }}
              style={{ marginBottom: SPACING.M }}
            />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { CustomerForm };
