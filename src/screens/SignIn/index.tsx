import React, { useCallback, useEffect, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container, HeaderTitle, HeaderContent, Unform } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import Logo from '../../components/Logo';
import { COLORS } from '../../styles/tokens';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
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

          return;
        }

        Alert.alert('Erro', 'Erro na autenticação, verifique seus dados.');
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
              onPress={() => formRef.current?.submitForm()}
            >
              Entrar
            </Button>
          </Unform>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
