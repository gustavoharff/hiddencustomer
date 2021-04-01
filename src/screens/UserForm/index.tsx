import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Picker } from '@react-native-picker/picker';
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
import Modal from 'react-native-modal';

import { Input, Button } from 'components';

import { api } from 'services';

import { COLORS, SPACING } from 'styles';

import { Company } from 'types';

import { useUsers } from 'hooks';

import { Container, FieldDescription, Unform } from './styles';

export function UserForm() {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { createUser } = useUsers();

  const [companiesModalOpen, setCompaniesModalOpen] = useState(false);

  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get('/companies').then(response => {
      setCompanies(response.data);
    });
  }, []);

  const navigation = useNavigation();

  const onCompanyChange = useCallback(value => {
    setSelectedCompanyId(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('name obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        if (!selectedCompanyId) {
          setLoadingButton(false);
          Alert.alert('Atenção', 'Selecione alguma empresa!');
          return;
        }

        await createUser({
          name: data.name,
          email: data.email,
          password: data.password,
          company_id: selectedCompanyId,
        });

        navigation.navigate('Administration');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
    },
    [navigation, selectedCompanyId, createUser],
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
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <FieldDescription>Informe o nome do usuário:</FieldDescription>
              <Input
                name="name"
                placeholder="Nome do usuário"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <FieldDescription>Informe o e-mail:</FieldDescription>
              <Input
                name="email"
                placeholder="E-mail do usuário"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <FieldDescription>Senha de acesso:</FieldDescription>
              <Input
                name="password"
                placeholder="Senha"
                secureTextEntry
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>

            <FieldDescription>Relacione a empresa:</FieldDescription>
            {Platform.OS === 'ios' ? (
              <>
                <FieldDescription
                  style={{ color: '#333' }}
                  onPress={() => setCompaniesModalOpen(true)}
                >
                  {companies.find(company => company.id === selectedCompanyId)
                    ?.name || 'Selecionar'}
                </FieldDescription>
                <Modal
                  isVisible={companiesModalOpen}
                  backdropColor="#333"
                  onBackdropPress={() => setCompaniesModalOpen(false)}
                >
                  <View style={{ backgroundColor: '#fff' }}>
                    <Picker
                      mode="dialog"
                      selectedValue={selectedCompanyId}
                      onValueChange={onCompanyChange}
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
                      {companies.map(company => (
                        <Picker.Item
                          color="#3D3D4D"
                          key={company.id}
                          label={company.name}
                          value={company.id}
                        />
                      ))}
                    </Picker>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <Button
                        title="Selecionar"
                        style={{ marginBottom: 20 }}
                        onPress={() => {
                          if (!selectedCompanyId) {
                            Alert.alert('Selecione uma empresa!');
                            return;
                          }

                          setCompaniesModalOpen(false);
                        }}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <Picker
                mode="dialog"
                selectedValue={selectedCompanyId}
                onValueChange={onCompanyChange}
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
                {companies.map(company => (
                  <Picker.Item
                    color="#3D3D4D"
                    key={company.id}
                    label={company.name}
                    value={company.id}
                  />
                ))}
              </Picker>
            )}
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}
          >
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
}
