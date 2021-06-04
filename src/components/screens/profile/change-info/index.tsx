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
import { useNavigation } from '@react-navigation/native';

import { Input, Button } from 'components';

import { SPACING } from 'styles';

import { api } from 'services';

import { getValidationErrors } from 'utils';

import { useAuth } from 'hooks';

import { Container, Unform } from './styles';

export function ChangeInfo(): JSX.Element {
  const { updateUser, user } = useAuth();

  const navigation = useNavigation();

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

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          Alert.alert('Atenção!', 'Preencha corretamente todos os campos.');
          return;
        }

        Alert.alert('Atenção!', 'Ocorreu um erro ao alterar seus dados.');
      }
    },
    [updateUser, navigation],
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
          <Unform ref={formRef} onSubmit={handleSubmit} initialData={user}>
            <Input
              label="Nome completo"
              ref={nameInputRef}
              name="name"
              placeholder="Nome"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              label="Endereço de e-mail"
              ref={emailInputRef}
              name="email"
              placeholder="E-mail"
              textContentType="emailAddress"
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
