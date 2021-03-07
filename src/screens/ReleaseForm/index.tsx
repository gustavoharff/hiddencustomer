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

import { Button, Input } from 'components';

import { useCustomers, useReleases } from 'hooks';

import { COLORS, SPACING } from 'styles';

import { api, getRealm } from 'services';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { Container, Unform, FieldDescription } from './styles';

const ReleaseForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const navigation = useNavigation();

  const { setReleases } = useReleases();
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

        const response = await api.post('/releases', {
          name: data.name,
          customer_id: selectedValue,
        });

        const customer = customers.find(c => c.id === selectedValue);

        setReleases(state => [{ ...response.data, customer }, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('Release', response.data);
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
    [navigation, setReleases, selectedValue, customers],
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
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <FieldDescription>Informe o nome do lançamento:</FieldDescription>
              <Input
                name="name"
                placeholder="Nome"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="default"
              />
            </Unform>

            <FieldDescription>Relacione o cliente:</FieldDescription>
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
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { ReleaseForm };
