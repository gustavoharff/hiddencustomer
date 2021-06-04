import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Button, Input } from 'components';

import { SPACING } from 'styles';

import { api } from 'services';

import { Unform } from './styles';

type Params = {
  ResetPassword: {
    token: string;
  };
};

type Props = StackScreenProps<Params, 'ResetPassword'>;

export function ResetPassword({ route }: Props): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async data => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/me/password/reset', {
          token: route.params.token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });

        navigation.navigate('SignIn');

        Alert.alert('Sucesso!', 'Sua senha foi atualizada!');
        setLoadingButton(false);
      } catch (err) {
        Alert.alert(err.response.data.message);
      }
    },
    [route.params?.token, navigation],
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
        <Unform ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="password"
            label="Escolha uma nova senha"
            placeholder="Nova senha"
            returnKeyType="next"
            autoCorrect={false}
            secureTextEntry
          />

          <Input
            name="password_confirmation"
            label="Confirme sua senha"
            placeholder="Confirmação de senha"
            returnKeyType="send"
            autoCorrect={false}
            secureTextEntry
          />
        </Unform>
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          title="Enviar"
          loading={loadingButton}
          onPress={() => {
            setLoadingButton(true);
            formRef.current?.submitForm();
          }}
          style={{ marginBottom: SPACING.M }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
