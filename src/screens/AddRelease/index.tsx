import React, { useCallback, useRef, useState } from 'react';
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
import { useCustomers } from '../../hooks/customers';
import { COLORS } from '../../styles/tokens';
import ListHeader from '../../components/ListHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Unform } from './styles';
import api from '../../services/api';
import { useReleases } from '../../hooks/releases';
import getRealm from '../../services/realm';

const AddRelease: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();

  const { setReleases } = useReleases();
  const { customers } = useCustomers();

  const onPickerChange = useCallback(value => {
    setSelectedValue(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      if (!selectedValue) {
        Alert.alert('Atenção', 'Selecione algum cliente!');
        return;
      }

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.post('/releases', {
          name: data.name,
          customer_id: selectedValue,
        });

        setReleases(state => [response.data, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('Release', response.data);
        });

        navigation.navigate('Releases');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
        }
      }
    },
    [navigation, setReleases, selectedValue],
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
          <ListHeader
            title="Cadastrar lançamento"
            description="Digite o nome do lançamento:"
          />

          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Nome"
              placeholderTextColor={COLORS.FONT_LIGHT}
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Unform>
          <Picker
            mode="dialog"
            selectedValue={selectedValue}
            onValueChange={onPickerChange}
            style={{ color: COLORS.FONT, width: '95%' }}
            dropdownIconColor={COLORS.FONT}
          >
            <Picker.Item
              color={
                Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
              }
              label="Selecione o cliente..."
              value={undefined}
            />
            {customers.map(customer => (
              <Picker.Item
                color={
                  Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
                }
                key={customer.id}
                label={customer.name}
                value={customer.id}
              />
            ))}
          </Picker>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Cadastrar"
              onPress={() => formRef.current?.submitForm()}
            />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddRelease;
