import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

// import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  HeaderTitle,
  HeaderContent,
  InputName,
  Unform,
} from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  // const navigation = useNavigation();

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

          return;
        }

        Alert.alert('Error', 'Authentication failure');
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
          <View>
            <HeaderTitle>Cliente Oculto</HeaderTitle>
          </View>
          <View>
            <HeaderContent>Faça seu login</HeaderContent>
          </View>

          <Unform ref={formRef} onSubmit={handleSubmit}>
            <View style={{ flexDirection: 'row' }}>
              <InputName>Endereço de e-mail</InputName>
            </View>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <View style={{ flexDirection: 'row' }}>
              <InputName>Senha</InputName>
            </View>
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Logn in
            </Button>
          </Unform>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
