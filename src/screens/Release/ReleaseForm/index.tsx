import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { Button, Input, PickerIOS } from 'components';

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

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState(
    route.params?.release?.customer_id || '',
  );
  const [selectedPayment, setSelectedPayment] = useState(
    route.params?.release?.paid || false,
  );
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
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
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        if (!selectedCustomerId) {
          setLoadingButton(false);
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
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
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
            {Platform.OS === 'ios' ? (
              <>
                <Label
                  style={{ color: '#333' }}
                  onPress={() => setCustomerModalOpen(true)}
                >
                  {customers.find(
                    customer => customer.id === selectedCustomerId,
                  )?.name || 'Selecionar'}
                </Label>
                <PickerIOS
                  modalIsVisible={customerModalOpen}
                  modalOnBackdropPress={() => setCustomerModalOpen(false)}
                  items={customers}
                  nameProp="name"
                  valueProp="id"
                  selectedValue={selectedCustomerId}
                  onValueChange={onCustomerChange}
                  buttonOnPress={() => {
                    if (!selectedCustomerId) {
                      Alert.alert('Selecione um cliente!');
                      return;
                    }

                    setCustomerModalOpen(false);
                  }}
                />
              </>
            ) : (
              <Picker
                mode="dialog"
                selectedValue={selectedCustomerId}
                onValueChange={onCustomerChange}
                style={{
                  color: '#3D3D4D',
                  marginHorizontal: SPACING.L,
                }}
                dropdownIconColor="#3D3D4D"
              >
                <Picker.Item
                  color="#3D3D4D"
                  label="Selecionar..."
                  value={undefined}
                />
                {customers.map(customer => (
                  <Picker.Item
                    color="#3D3D4D"
                    key={customer.id}
                    label={customer.name}
                    value={customer.id}
                  />
                ))}
              </Picker>
            )}

            <Label>Status do pagamento:</Label>
            {Platform.OS === 'ios' ? (
              <>
                <Label
                  style={{ color: '#333' }}
                  onPress={() => setPaymentModalOpen(true)}
                >
                  {selectedPayment ? 'Realizado' : 'Não realizado'}
                </Label>

                <PickerIOS
                  modalIsVisible={paymentModalOpen}
                  modalOnBackdropPress={() => setPaymentModalOpen(false)}
                  items={[
                    { paid: '1', name: 'Realizado' },
                    { paid: '0', name: 'Não realizado' },
                  ]}
                  nameProp="name"
                  valueProp="paid"
                  onValueChange={onPaymentChange}
                  selectedValue={selectedPayment ? '1' : '0'}
                  buttonOnPress={() => setPaymentModalOpen(false)}
                />
              </>
            ) : (
              <>
                <Picker
                  mode="dialog"
                  selectedValue={selectedPayment ? '1' : '0'}
                  onValueChange={onPaymentChange}
                  style={{
                    color: '#3D3D4D',
                    marginHorizontal: SPACING.L,
                  }}
                  dropdownIconColor="#3D3D4D"
                >
                  <Picker.Item
                    color="#3D3D4D"
                    key="true"
                    label="Realizado"
                    value="1"
                  />
                  <Picker.Item
                    color="#3D3D4D"
                    key="false"
                    label="Não Realizado"
                    value="0"
                  />
                </Picker>
              </>
            )}
          </View>
        </Container>
      </ScrollView>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          title={route.params?.release ? 'Salvar' : 'Cadastrar'}
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
