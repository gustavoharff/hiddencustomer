import React, { useCallback, useRef, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { StackScreenProps } from '@react-navigation/stack';

import { Button, Input } from 'components';

import { useCustomers } from 'hooks';

import { COLORS, SPACING } from 'styles';

import { Customer } from 'types';

import { Container, Unform, FieldDescription } from './styles';

type Params = {
  CustomerChange: {
    customer_id: string;
  };
};

type Props = StackScreenProps<Params, 'CustomerChange'>;

export function CustomerChange({ route }: Props) {
  const { customers, updateCustomer } = useCustomers();
  const navigation = useNavigation();

  const [customer] = useState<Customer>(() => {
    const finddedCustomer = customers.find(
      c => c.id === route.params.customer_id,
    );

    if (finddedCustomer) {
      return finddedCustomer;
    }
    return {} as Customer;
  });

  const formRef = useRef<FormHandles>(null);

  const [loadingButton, setLoadingButton] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await updateCustomer({
          customer_id: route.params.customer_id,
          name: data.name,
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
    [navigation, route.params.customer_id, updateCustomer],
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
          <View style={{ width: '100%' }}>
            <Unform
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={customer}
            >
              <FieldDescription>Informe o nome do cliente:</FieldDescription>
              <Input
                name="name"
                placeholder="Nome"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="default"
              />
            </Unform>
          </View>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Salvar"
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
}
