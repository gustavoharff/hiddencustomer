import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
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

import { Input, Button, Picker } from 'components';

import { SPACING } from 'styles';

import { useCompanies, useUsers } from 'hooks';

import { User } from 'types';

import { Container, Label, Unform } from './styles';

type Props = {
  UserForm: {
    user?: User;
  };
};

type UserFormProps = StackScreenProps<Props, 'UserForm'>;

export function UserForm({ route }: UserFormProps): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { createUser, updateUser } = useUsers();

  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  const { companies, loadApiCompanies, loadLocalCompanies } = useCompanies();

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.user) {
      navigation.setOptions({
        headerTitle: 'Editar usuário',
      });
      setSelectedCompanyId(route.params?.user.company_id);
      formRef.current?.setFieldValue('name', route.params?.user.name);
      formRef.current?.setFieldValue('email', route.params?.user.email);
    }
  }, [navigation, route.params?.user]);

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

  useEffect(() => {
    loadApiCompanies().catch(() => loadLocalCompanies());
  }, []);

  const onCompanyChange = useCallback(value => {
    setSelectedCompanyId(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        let schema;
        formRef.current?.setErrors({});

        if (route.params?.user) {
          schema = Yup.object().shape({
            name: Yup.string().required('name obrigatório'),
            email: Yup.string().required('E-mail obrigatório'),
          });
        } else {
          schema = Yup.object().shape({
            name: Yup.string().required('name obrigatório'),
            email: Yup.string().required('E-mail obrigatório'),
            password: Yup.string().required('Senha obrigatório'),
          });
        }

        await schema.validate(data, { abortEarly: false });

        if (!selectedCompanyId) {
          setLoadingButton(false);
          Alert.alert('Atenção', 'Selecione alguma empresa!');
          return;
        }

        if (!route.params?.user) {
          await createUser({
            name: data.name,
            email: data.email,
            password: data.password,
            company_id: selectedCompanyId,
          });
        } else {
          await updateUser({
            id: route.params.user.id,
            company_id: selectedCompanyId,
            email: data.email,
            name: data.name,
            password: data.password || null,
          });
        }

        navigation.navigate('Administration');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete todos os campos.');
          setLoadingButton(false);
          return;
        }

        setLoadingButton(false);
      }
    },
    [route.params?.user, selectedCompanyId, navigation, createUser, updateUser],
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
            <Picker
              doneText="Selecionar"
              items={[
                { label: 'Selecionar', value: '' },
                ...companies.map(company => ({
                  label: company.name,
                  value: company.id,
                })),
              ]}
              onChange={onCompanyChange}
              value={selectedCompanyId}
              androidStyle={{ width: '100%' }}
            />
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
          title={route.params?.user ? 'Editar' : 'Cadastrar'}
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
