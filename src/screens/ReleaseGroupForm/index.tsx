import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as Yup from 'yup';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';

import { Input, Button } from 'components';

import { SPACING } from 'styles';

import { api, getRealm } from 'services';

import { useGroups } from 'hooks';

import { Container, Unform, FieldDescription } from './styles';

type Params = {
  ReleaseDetails: {
    release_id: string;
  };
};

type Props = StackScreenProps<Params, 'ReleaseDetails'>;

const ReleaseGroupForm: React.FC<Props> = ({ route }) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();

  const [loadingButton, setLoadingButton] = useState(false);

  const { setGroups } = useGroups();

  const onPickerChange = useCallback(value => {
    setSelectedValue(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        if (!selectedValue) {
          Alert.alert('Atenção', 'Selecione algum tipo de grupo!');
          setLoadingButton(false);
          return;
        }

        const response = await api.post('/release/groups', {
          name: data.name,
          type: selectedValue,
          release_id: route.params.release_id,
        });

        setGroups(state => [response.data, ...state]);

        const realm = await getRealm();

        realm.write(() => {
          realm.create('ReleaseGroup', response.data);
        });

        navigation.navigate('ReleaseDetails');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
    },
    [navigation, selectedValue, setGroups, route.params.release_id],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(true) + SPACING.L * 2
      }
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <View style={{ width: '100%' }}>
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <FieldDescription>Informe o nome do grupo:</FieldDescription>
              <Input
                name="name"
                placeholder="Nome"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>
            <FieldDescription>Informe o tipo do grupo:</FieldDescription>
            <Picker
              mode="dialog"
              selectedValue={selectedValue}
              onValueChange={onPickerChange}
              style={{
                color: '#3D3D4D',
                marginHorizontal: SPACING.L,
              }}
              dropdownIconColor="#3D3D4D"
            >
              <Picker.Item
                color="#3D3D4D"
                label="Selecionar..."
                value={undefined}
              />

              <Picker.Item
                color="#3D3D4D"
                key="whatsapp"
                label="WhatsApp"
                value="whatsapp"
              />
              <Picker.Item
                color="#3D3D4D"
                key="discord"
                label="Discord"
                value="discord"
              />
              <Picker.Item
                color="#3D3D4D"
                key="telegram"
                label="Telegram"
                value="telegram"
              />
            </Picker>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Cadastrar"
              loading={loadingButton}
              onPress={() => {
                formRef.current?.submitForm();
                setLoadingButton(true);
              }}
              style={{ marginBottom: SPACING.M }}
            />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { ReleaseGroupForm };
