import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Button, Input, ListHeader } from 'components';

import { SPACING } from 'styles';

import { api } from 'services';
import { Screen } from 'components/ui';
import { Unform } from './styles';

export function ForgotPassword(): JSX.Element {
  const [loadingButton, setLoadingButton] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const [codingStep, setCodingStep] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      if (codingStep) {
        try {
          await api.get(`/me/password/check/${data.code}`);

          navigation.navigate('ResetPassword', {
            token: data.code,
          });

          Keyboard.dismiss();
          setLoadingButton(false);
        } catch (err) {
          Alert.alert('Atenção', err.response.data.message);
        }

        setLoadingButton(false);
        return;
      }

      await api.post('/me/password/forgot', {
        email: data.email,
      });

      Alert.alert('Atenção!', 'Email de recuperação enviado.');
      setCodingStep(true);
      setLoadingButton(false);
    },
    [codingStep, navigation],
  );

  const changeEmail = useCallback(() => {
    setCodingStep(false);
  }, []);

  return (
    <Screen keyboard>
      <ListHeader
        title="Esqueceu sua senha?"
        description="Preencha o e-mail abaixo e enviaremos um código de recuperação."
        loading={false}
      />

      <ScrollView>
        <Unform ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            label="E-mail"
            placeholder="Seu e-mail"
            returnKeyType="send"
            editable={!codingStep}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={{
              opacity: codingStep ? 0.2 : 1,
            }}
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
          {codingStep && (
            <View style={{ width: '100%' }}>
              <RectButton
                style={{
                  marginLeft: 'auto',
                  marginRight: 20,
                }}
                onPress={changeEmail}
              >
                <Text style={{ color: '#fff' }}>Alterar e-mail</Text>
              </RectButton>
            </View>
          )}

          {codingStep && (
            <Input
              name="code"
              label="Código de recuperação"
              placeholder="Insira o código aqui"
              returnKeyType="send"
              keyboardType="numeric"
              maxLength={5}
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          )}
        </Unform>
      </ScrollView>

      <Button
        title="Enviar"
        loading={loadingButton}
        onPress={() => {
          setLoadingButton(true);
          formRef.current?.submitForm();
        }}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
