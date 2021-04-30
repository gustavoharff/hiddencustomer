import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { StackScreenProps } from '@react-navigation/stack';
import * as Yup from 'yup';

import { Button, Input, Picker, Screen } from 'components';

import { useCustomers, useReleases } from 'hooks';

import { SPACING } from 'styles';

import { Release } from 'types';

import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseForm: {
    release?: Release;
  };
};

type Props = StackScreenProps<Params, 'ReleaseForm'>;

export function ReleaseForm({ route }: Props): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const [selectedCustomerId, setSelectedCustomerId] = useState(
    route.params?.release?.customer_id || '',
  );
  const [selectedPayment, setSelectedPayment] = useState(
    route.params?.release?.paid || false,
  );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.release) {
      navigation.setOptions({
        headerTitle: 'Editar lançamento',
      });
      setSelectedCustomerId(route.params.release.customer_id);
      formRef.current?.setFieldValue('name', route.params.release.name);
    }
  }, [navigation, route.params]);

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

  const { createRelease, updateRelease } = useReleases();
  const { customers, loadApiCustomers, loadLocalCustomers } = useCustomers();

  const onCustomerChange = useCallback(value => {
    setSelectedCustomerId(value);
  }, []);

  const onPaymentChange = useCallback(value => {
    if (value === '1') {
      setSelectedPayment(true);
    }

    if (value === '0') {
      setSelectedPayment(false);
    }
  }, []);

  useEffect(() => {
    loadApiCustomers().catch(() => loadLocalCustomers());
  }, [loadApiCustomers, loadLocalCustomers]);

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        if (!selectedCustomerId) {
          setLoading(false);
          Alert.alert('Atenção', 'Selecione algum cliente!');
          return;
        }

        if (route.params?.release) {
          await updateRelease({
            release_id: route.params?.release.id,
            customer_id: selectedCustomerId,
            name: data.name,
            paid: selectedPayment,
          });
        } else {
          await createRelease({
            name: data.name,
            customer_id: selectedCustomerId,
          });
        }

        navigation.navigate('Releases');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          return;
        }
      }
      setLoading(false);
    },
    [
      selectedCustomerId,
      route.params?.release,
      navigation,
      updateRelease,
      selectedPayment,
      createRelease,
    ],
  );

  return (
    <Screen keyboard>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <View style={{ width: '100%' }}>
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Informe o nome do lançamento:"
                placeholder="Nome"
                returnKeyType="default"
              />
            </Unform>

            <Label>Relacione o cliente:</Label>
            <Picker
              doneText="Selecionar"
              items={[
                { label: 'Selecionar', value: '' },
                ...customers.map(customer => ({
                  label: customer.name,
                  value: customer.id,
                })),
              ]}
              onChange={onCustomerChange}
              value={selectedCustomerId}
              androidStyle={{ width: '100%' }}
            />

            <Label>Status do pagamento:</Label>
            <Picker
              doneText="Selecionar"
              items={[
                { label: 'Selecionar', value: '' },
                { label: 'Realizado', value: '1' },
                { label: 'Não realizado', value: '0' },
              ]}
              onChange={onPaymentChange}
              value={selectedPayment ? '1' : '0'}
              androidStyle={{ width: '100%' }}
            />
          </View>
        </Container>
      </ScrollView>
      <Button
        title={route.params?.release ? 'Salvar' : 'Cadastrar'}
        loading={loading}
        onPress={() => {
          formRef.current?.submitForm();
        }}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
