import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Button, Input, Logo } from 'components';

import { useAuth } from 'hooks';

import { getValidationErrors } from 'utils';

import { COLORS } from 'styles';

import { Container, HeaderTitle, HeaderContent, Unform } from './styles';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    RNBootSplash.hide({ fade: true }); // fade
  }, []);

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
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

          setLoadingButton(false);
          return;
        }

        if (err.response?.status === 402) {
          Alert.alert('Erro', 'Usuário sem permissão de acesso ao sistema.');
        } else {
          Alert.alert('Erro', 'Erro na autenticação, verifique seus dados.');
        }

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
              placeholderTextColor={COLORS.FONT_LIGHT}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              returnKeyType="send"
              placeholder="Senha"
              placeholderTextColor={COLORS.FONT_LIGHT}
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              title="Entrar"
              onPress={() => {
                formRef.current?.submitForm();
                setLoadingButton(true);
              }}
              loading={loadingButton}
            >
              Entrar
            </Button>
          </Unform>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { SignIn };
