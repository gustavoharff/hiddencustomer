import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Alert, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from 'components';

import { COLORS } from 'styles';

import { api } from 'services';

import { getValidationErrors } from 'utils';

import { useAuth } from 'hooks';

import { Container, Unform } from './styles';

export function ChangeUserInfo() {
  const { updateUser, user, signOut } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put('/me/info', data);
        updateUser(response.data);

        Alert.alert('Sucesso!', 'Suas informações foram atualizadas.');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          Alert.alert('Atenção!', 'Preencha corretamente todos os campos.');
          return;
        }

        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
          return;
        }

        Alert.alert('Atenção!', 'Ocorreu um erro ao alterar seus dados.');
      }
    },
    [updateUser, signOut],
  );

  return (
    <Container>
      <Unform ref={formRef} onSubmit={handleSubmit} initialData={user}>
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <Input
            ref={nameInputRef}
            name="name"
            placeholder="Nome"
            textContentType="newPassword"
            placeholderTextColor={COLORS.FONT_LIGHTEST}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />
          <Input
            ref={emailInputRef}
            name="email"
            placeholder="E-mail"
            textContentType="emailAddress"
            placeholderTextColor={COLORS.FONT_LIGHTEST}
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </View>
      </Unform>
      <Button
        title="Realizar alteração"
        onPress={() => formRef.current?.submitForm()}
      />
    </Container>
  );
}
