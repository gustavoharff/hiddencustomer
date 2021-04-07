import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { Input, Button } from 'components';

import { api } from 'services';

import { getValidationErrors } from 'utils';

import { useAuth } from 'hooks';

import { SPACING } from 'styles';

import { Container, Unform } from './styles';

export function ChangeUserPassword() {
  const { updateUser, signOut } = useAuth();

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

        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
          return;
        }

        Alert.alert(
          'Atenção!',
          'Ocorreu um erro ao alterar sua senha, verifique seus dados.',
        );
      }
    },
    [updateUser, signOut],
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
          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input
              ref={oldPasswordInputRef}
              label="Sua senha atual"
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
              label="Defina uma nova senha"
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
              label="Confirme a nova senha"
              name="password_confirmation"
              placeholder="Confirmação de senha"
              textContentType="newPassword"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Unform>
        </Container>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          title="Realizar alteração"
          onPress={() => formRef.current?.submitForm()}
          style={{ marginBottom: SPACING.M }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
