import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { StackScreenProps } from '@react-navigation/stack';
import * as Yup from 'yup';

import { Button, Input, Picker, Screen } from 'components';

import { useCustomers } from 'hooks';

import { SPACING } from 'styles';

import { Release } from 'types';

import { api } from 'services';
import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseForm: {
    type: 'create' | 'update';
    release?: Release;
    setReleases: React.Dispatch<React.SetStateAction<Release[]>>;
  };
};

type Props = StackScreenProps<Params, 'ReleaseForm'>;

export function ReleaseForm({ route }: Props): JSX.Element {
  const { setReleases } = route.params;
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
    if (route.params.type === 'update' && route.params.release) {
      navigation.setOptions({
        headerTitle: 'Editar lançamento',
      });
      setSelectedCustomerId(route.params.release.customer_id);
      formRef.current?.setFieldValue('name', route.params.release.name);
    }
  }, [navigation, route.params]);

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

        if (route.params.type === 'update' && route.params.release) {
          const response = await api.put(
            `/release/${route.params.release.id}`,
            {
              name: data.name,
              paid: selectedPayment,
              customer_id: selectedCustomerId,
            },
          );

          setReleases(state =>
            state.map(release =>
              release.id === route.params.release?.id ? response.data : release,
            ),
          );
        } else if (route.params.type === 'create') {
          const response = await api.post<Release>('/releases', {
            name: data.name,
            customer_id: selectedCustomerId,
          });

          setReleases(state => [response.data, ...state]);
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
      route.params.type,
      route.params.release,
      navigation,
      selectedPayment,
      setReleases,
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
