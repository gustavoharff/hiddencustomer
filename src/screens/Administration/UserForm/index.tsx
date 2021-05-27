import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Input, Button, Picker, Screen } from 'components';

import { SPACING } from 'styles';

import { Company, User } from 'types';

import { api } from 'services';

import { Container, Label, Unform } from './styles';

type Props = {
  UserForm: {
    user?: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  };
};

type UserFormProps = StackScreenProps<Props, 'UserForm'>;

export function UserForm({ route }: UserFormProps): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { setUsers } = route.params;

  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('user');

  useEffect(() => {
    api.get('/companies').then(response => {
      setCompanies(response.data);
    });
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.user) {
      navigation.setOptions({
        headerTitle: 'Editar usuário',
      });
      setSelectedCompanyId(route.params?.user.company_id);
      setSelectedPermission(route.params?.user.permission);
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

  const onCompanyChange = useCallback(value => {
    setSelectedCompanyId(value);
  }, []);

  const onPermissionChange = useCallback(value => {
    setSelectedPermission(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);
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
          setLoading(false);
          Alert.alert('Atenção', 'Selecione alguma empresa!');
          return;
        }

        if (!route.params?.user) {
          const response = await api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password,
            company_id: selectedCompanyId,
            permission: selectedPermission,
          });

          setUsers(state => [response.data, ...state]);
        } else {
          const response = await api.put(`/users/${route.params.user.id}`, {
            company_id: selectedCompanyId,
            email: data.email,
            name: data.name,
            password: data.password || null,
            permission: selectedPermission,
          });

          setUsers(state =>
            state.map(user =>
              user.id === route.params.user?.id ? response.data : user,
            ),
          );
        }

        navigation.navigate('Administration');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete os campos obrigatórios.');
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    },
    [
      route.params.user,
      selectedCompanyId,
      navigation,
      selectedPermission,
      setUsers,
    ],
  );

  return (
    <Screen keyboard>
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
                label="Senha de acesso: (Opcional)"
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

            <Label>Permissão:</Label>
            <Picker
              doneText="Selecionar"
              items={[
                { label: 'Usuário', value: 'user' },
                { label: 'Cliente', value: 'client' },
                { label: 'Administrador', value: 'admin' },
              ]}
              onChange={onPermissionChange}
              value={selectedPermission}
              androidStyle={{ width: '100%' }}
            />
          </View>
        </Container>
      </ScrollView>

      <Button
        title={route.params?.user ? 'Editar' : 'Cadastrar'}
        loading={loading}
        onPress={() => {
          formRef.current?.submitForm();
        }}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
