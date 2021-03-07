import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Alert, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from 'components';

import { api } from 'services';

import { getValidationErrors } from 'utils';

import { useAuth } from 'hooks';

import { Container, Unform } from './styles';

const ChangeUserPassword: React.FC = () => {
  const { updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          old_password: Yup.string().required(),
          password: Yup.string().when('old_password', {
            is: (val: any[]) => !!val.length,
            then: Yup.string().required('Required field'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any[]) => !!val.length,
              then: Yup.string().required('Required field'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Incorrect confirmation'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put('/me/password', data);

        updateUser(response.data);

        formRef.current?.reset();

        Alert.alert('Sucesso!', 'Sua senha foi atualizada.');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          Alert.alert('Atenção!', 'Preencha corretamente todos os campos.');
          return;
        }

        Alert.alert(
          'Atenção!',
          'Ocorreu um erro ao alterar sua senha, verifique seus dados.',
        );
      }
    },
    [updateUser],
  );

  return (
    <Container>
      <Unform ref={formRef} onSubmit={handleSubmit}>
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <Input
            ref={oldPasswordInputRef}
            name="old_password"
            placeholder="Senha atual"
            textContentType="newPassword"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef}
            name="password"
            placeholder="Nova senha"
            textContentType="newPassword"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          />
          <Input
            ref={confirmPasswordInputRef}
            name="password_confirmation"
            placeholder="Confirmação de senha"
            textContentType="newPassword"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </View>

        <Button
          title="Realizar alteração"
          onPress={() => formRef.current?.submitForm()}
        />
      </Unform>
    </Container>
  );
};

export { ChangeUserPassword };
