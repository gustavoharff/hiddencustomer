import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { StackScreenProps } from '@react-navigation/stack';

import { Input, Button } from 'components';

import { useCustomers } from 'hooks';

import { SPACING } from 'styles';

import { Customer } from 'types';

import { Container, Unform } from './styles';

type Props = {
  CustomerForm: {
    customer: Customer;
  };
};

type CustomerChangeProps = StackScreenProps<Props, 'CustomerForm'>;

export function CustomerForm({ route }: CustomerChangeProps): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { createCustomer, updateCustomer } = useCustomers();

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.customer) {
      navigation.setOptions({
        headerTitle: 'Editar cliente',
      });
      formRef.current?.setFieldValue('name', route.params.customer.name);
    }
  }, [navigation, route.params?.customer]);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();

    parent?.setOptions({
      tabBarVisible: false,
    });

    return () =>
      parent?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('E-mail obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        if (route.params?.customer) {
          await updateCustomer({
            name: data.name,
            customer_id: route.params.customer.id,
          });
        } else {
          await createCustomer(data.name);
        }

        navigation.navigate('Customers');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
    },
    [createCustomer, navigation, route.params?.customer, updateCustomer],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(false) + SPACING.L * 5
      }
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              label="Informe o nome do cliente:"
              placeholder="Nome do cliente"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Unform>
        </Container>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          title={route.params?.customer ? 'Salvar' : 'Registrar'}
          loading={loadingButton}
          onPress={() => {
            formRef.current?.submitForm();
            setLoadingButton(true);
          }}
          style={{ marginBottom: SPACING.M }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
