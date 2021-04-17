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

import { SPACING } from 'styles';

import { useCompanies, useUsers } from 'hooks';

import { Container, Label, Unform } from './styles';

export function UserForm(): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { createUser } = useUsers();

  const [companiesModalOpen, setCompaniesModalOpen] = useState(false);

  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  const { companies, loadApiCompanies, loadLocalCompanies } = useCompanies();

  const navigation = useNavigation();

  useEffect(() => {
    loadApiCompanies().catch(() => loadLocalCompanies());
  }, []);

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
        getBottomSpace() + getStatusBarHeight(false) + SPACING.L * 5
      }
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <View>
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Informe o nome do usuário:"
                placeholder="Nome do usuário"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Input
                name="email"
                label="Informe o e-mail:"
                placeholder="E-mail do usuário"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Input
                name="password"
                label="Senha de acesso:"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>

            <Label>Relacione a empresa:</Label>
            {Platform.OS === 'ios' ? (
              <>
                <Label
                  style={{ color: '#333' }}
                  onPress={() => setCompaniesModalOpen(true)}
                >
                  {companies.find(company => company.id === selectedCompanyId)
                    ?.name || 'Selecionar'}
                </Label>
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
        </Container>
      </ScrollView>
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
    </KeyboardAvoidingView>
  );
}
