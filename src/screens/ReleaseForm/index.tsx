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

import { Button, Input } from 'components';

import { useCustomers, useReleases } from 'hooks';

import { SPACING } from 'styles';

import { Container, Unform, Label } from './styles';

export function ReleaseForm(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const navigation = useNavigation();

  const { createRelease } = useReleases();
  const { customers, loadApiCustomers, loadLocalCustomers } = useCustomers();

  const onPickerChange = useCallback(value => {
    setSelectedValue(value);
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

        if (!selectedValue) {
          setLoadingButton(false);
          Alert.alert('Atenção', 'Selecione algum cliente!');
          return;
        }

        await createRelease({
          name: data.name,
          customer_id: selectedValue,
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
    [navigation, createRelease, selectedValue],
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
            <Picker
              mode="dialog"
              selectedValue={selectedValue}
              onValueChange={onPickerChange}
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
          </View>
        </Container>
      </ScrollView>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          title="Cadastrar"
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
