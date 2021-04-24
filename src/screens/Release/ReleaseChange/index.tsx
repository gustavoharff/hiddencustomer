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
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { StackScreenProps } from '@react-navigation/stack';
import Modal from 'react-native-modal';

import { Button, Input } from 'components';

import { useCustomers, useReleases } from 'hooks';

import { SPACING } from 'styles';

import { Release } from 'types';

import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseChange: {
    release_id: string;
  };
};

type ReleaseChangeProps = StackScreenProps<Params, 'ReleaseChange'>;

export function ReleaseChange({ route }: ReleaseChangeProps): JSX.Element {
  const { releases, updateRelease } = useReleases();
  const { customers, loadApiCustomers, loadLocalCustomers } = useCustomers();

  const navigation = useNavigation();

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

  const [release] = useState<Release>(() => {
    const finddedRelease = releases.find(r => r.id === route.params.release_id);

    if (finddedRelease) {
      return finddedRelease;
    }
    return {} as Release;
  });

  const formRef = useRef<FormHandles>(null);

  const [customersModalOpen, setCustomersModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(release.customer_id);
  const [selectedPayment, setSelectedPayment] = useState(release.paid);

  const onCustomerChange = useCallback(value => {
    setSelectedCustomer(value);
  }, []);

  const onPaymentChange = useCallback(value => {
    setSelectedPayment(value);
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

        if (!selectedCustomer) {
          setLoadingButton(false);
          Alert.alert('Atenção', 'Selecione algum cliente!');
          return;
        }

        await updateRelease({
          release_id: route.params.release_id,
          name: data.name,
          customer_id: selectedCustomer,
          paid: selectedPayment,
        });

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
      navigation,
      updateRelease,
      route.params.release_id,
      selectedCustomer,
      selectedPayment,
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
            <Unform ref={formRef} onSubmit={handleSubmit} initialData={release}>
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
                  onPress={() => setCustomersModalOpen(true)}
                >
                  {
                    customers.find(customer => customer.id === selectedCustomer)
                      ?.name
                  }
                </Label>

                <Modal
                  isVisible={customersModalOpen}
                  backdropColor="#333"
                  onBackdropPress={() => setCustomersModalOpen(false)}
                >
                  <View style={{ backgroundColor: '#fff' }}>
                    <Picker
                      mode="dialog"
                      selectedValue={selectedCustomer}
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
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <Button
                        title="Selecionar"
                        style={{ marginBottom: 20 }}
                        onPress={() => {
                          if (!selectedCustomer) {
                            Alert.alert('Selecione um cliente!');
                            return;
                          }
                          setCustomersModalOpen(false);
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <Picker
                mode="dialog"
                selectedValue={selectedCustomer}
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

                <Modal
                  isVisible={paymentModalOpen}
                  backdropColor="#333"
                  onBackdropPress={() => setPaymentModalOpen(false)}
                >
                  <View style={{ backgroundColor: '#fff' }}>
                    <Picker
                      mode="dialog"
                      selectedValue={selectedPayment}
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
                        value
                      />
                      <Picker.Item
                        color="#3D3D4D"
                        key="false"
                        label="Não Realizado"
                        value={false}
                      />
                    </Picker>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <Button
                        title="Selecionar"
                        onPress={() => setPaymentModalOpen(false)}
                        style={{ marginBottom: 20 }}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <>
                <Picker
                  mode="dialog"
                  selectedValue={selectedPayment}
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
                    value
                  />
                  <Picker.Item
                    color="#3D3D4D"
                    key="false"
                    label="Não Realizado"
                    value={false}
                  />
                </Picker>
              </>
            )}
          </View>
        </Container>
      </ScrollView>
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
    </KeyboardAvoidingView>
  );
}
