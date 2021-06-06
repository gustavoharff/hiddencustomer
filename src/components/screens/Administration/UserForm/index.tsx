import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Input, Button, Picker, Screen, MultipleOptionInput } from 'components';

import { SPACING } from 'styles';

import { User } from 'types';

import { CompanyContext } from 'hooks';

import { UsersContext } from 'hooks/users';

import { Container, Unform } from './styles';

type Props = {
  UserForm: {
    user?: User;
  };
};

type UserFormProps = StackScreenProps<Props, 'UserForm'>;

export function UserForm({ route }: UserFormProps): JSX.Element {
  const { companies, refresh } = useContext(CompanyContext);
  const { createUser, updateUser } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('user');
  const [selectedActivity, setSelectedActivity] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.user) {
      navigation.setOptions({
        headerTitle: 'Editar usuário',
      });
      setSelectedCompanyId(route.params?.user.company_id);
      setSelectedPermission(route.params?.user.permission);
      setSelectedActivity(route.params?.user.active);
      formRef.current?.setFieldValue('name', route.params?.user.name);
      formRef.current?.setFieldValue('email', route.params?.user.email);
    }
  }, [navigation, route.params?.user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onCompanyChange = useCallback(value => {
    setSelectedCompanyId(value);
  }, []);

  const onPermissionChange = useCallback(value => {
    setSelectedPermission(value);
  }, []);

  const onActivityChange = useCallback(value => {
    setSelectedActivity(value);
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
          await createUser({
            name: data.name,
            email: data.email,
            password: data.password,
            company_id: selectedCompanyId,
            permission: selectedPermission,
          });
        } else {
          await updateUser({
            user_id: route.params.user.id,
            name: data.name,
            email: data.email,
            password: data.password || null,
            permission: selectedPermission,
            active: selectedActivity,
            company_id: selectedCompanyId,
          });
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
      route.params?.user,
      selectedCompanyId,
      navigation,
      createUser,
      selectedPermission,
      updateUser,
      selectedActivity,
    ],
  );

  return (
    <Screen keyboard>
      <ScrollView>
        <Container>
          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              label="Informe o nome do usuário:"
              placeholder="Nome do usuário"
              returnKeyType="send"
            />

            <Input
              name="email"
              label="Informe o e-mail:"
              placeholder="E-mail do usuário"
              returnKeyType="send"
            />

            <Input
              name="password"
              label="Senha de acesso: (Opcional)"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
            />
          </Unform>

          <Picker
            label="Relacione a empresa"
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

          <MultipleOptionInput
            label="Permissão"
            onChange={onPermissionChange}
            value={selectedPermission}
            items={[
              { label: 'Usuário', value: 'user' },
              { label: 'Cliente', value: 'client' },
              { label: 'Admin', value: 'admin' },
            ]}
          />

          <MultipleOptionInput
            label="Atividade"
            onChange={onActivityChange}
            value={selectedActivity}
            items={[
              { label: 'Ativo', value: true },
              { label: 'Inativo', value: false },
            ]}
          />
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
