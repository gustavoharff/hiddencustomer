import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import { hide } from 'react-native-bootsplash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Button, Input, Logo } from 'components';

import { useAuth } from 'hooks';

import { getValidationErrors } from 'utils';

import {
  Container,
  HeaderTitle,
  HeaderContent,
  Unform,
  ForgotPassword,
} from './styles';

type SignInFormData = {
  email: string;
  password: string;
};

export function SignIn(): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    hide({ fade: true }); // fade
  }, []);

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoadingButton(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Enter a valid email address'),
          password: Yup.string().required('Password required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          Alert.alert('Alerta', 'Complete os campos corretamente.');

          return;
        }

        if (err.response.status === 401) {
          Alert.alert('Erro', 'Usuário sem permissão de acesso ao sistema.');
        } else if (err.response.status === 400) {
          Alert.alert('Erro', 'Erro na autenticação, verifique seus dados.');
        } else {
          Alert.alert(
            'Erro',
            'Ocoreu um erro durante a tentativa de acesso ao sistema.',
          );
        }
      } finally {
        setLoadingButton(false);
      }
    },
    [signIn],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Logo size={90} />
          <View>
            <HeaderTitle>Cliente Oculto</HeaderTitle>
          </View>
          <View>
            <HeaderContent>Faça seu login</HeaderContent>
          </View>

          <Unform ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              returnKeyType="next"
              placeholder="E-mail"
              darkMode
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              returnKeyType="send"
              placeholder="Senha"
              darkMode
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              title="Entrar"
              onPress={() => {
                formRef.current?.submitForm();
              }}
              loading={loadingButton}
            />
          </Unform>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <ForgotPassword>Esqueci minha senha</ForgotPassword>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
