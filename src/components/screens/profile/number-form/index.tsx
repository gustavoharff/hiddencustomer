import React, { useRef, useCallback, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Section, Input, Button, Screen } from 'components';

import { SPACING } from 'styles';

import { PhoneNumber } from 'types';
import { api } from 'services';

import { cleanTelephone, formatTelephone } from 'utils';

type Props = {
  NumberForm: {
    setNumbers: React.Dispatch<React.SetStateAction<PhoneNumber[]>>;
  };
};

type NumberFormProps = StackScreenProps<Props, 'NumberForm'>;

export function NumberForm({ route }: NumberFormProps): JSX.Element {
  const { setNumbers } = route.params;
  const numberField = useRef<TextInput | null>(null);
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const [number, setNumber] = useState('');

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    async data => {
      setLoading(true);
      if (!number) {
        Alert.alert('Atenção!', 'Complete o campo de número');
        setLoading(false);
        return;
      }

      const response = await api.post('/numbers', {
        name: data.name,
        phone_number: String(cleanTelephone(number)),
      });

      setNumbers(state => [response.data, ...state]);

      navigation.goBack();

      setLoading(false);
    },
    [navigation, number, setNumbers],
  );

  return (
    <Screen keyboard>
      <Section flex>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Input
            ref={numberField}
            name="phone_number"
            placeholder="(00) 0000-0000"
            label="Número de telefone"
            blurOnSubmit={false}
            value={number}
            keyboardType="numeric"
            onChangeText={value => setNumber(formatTelephone(value))}
            maxLength={15}
          />

          <Input
            name="name"
            placeholder="Breno Heitor Moraes"
            label="Nome fictício (Opcional)"
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </Section>
      <Button
        title="Cadastrar"
        style={{ marginBottom: SPACING.L }}
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      />
    </Screen>
  );
}
