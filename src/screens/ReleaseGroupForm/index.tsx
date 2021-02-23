import { FormHandles } from '@unform/core';
import { ListHeader } from 'components';
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as Yup from 'yup';

import { Input, Button } from 'components';

import { COLORS, SPACING } from 'styles';

import { api, getRealm } from 'services';

import { useGroups } from 'hooks';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Container, Unform } from './styles';

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

  const { setGroups } = useGroups();

  const onPickerChange = useCallback(value => {
    setSelectedValue(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      if (!selectedValue) {
        Alert.alert('Atenção', 'Selecione algum tipo de grupo!');
        return;
      }

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

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
        }
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
            <ListHeader
              title="Cadastrar grupo para o lançamento"
              description="Digite o nome do grupo do lançamento:"
            />

            <Unform ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                placeholder="Nome"
                placeholderTextColor={COLORS.FONT_LIGHT}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>
            <Picker
              mode="dialog"
              selectedValue={selectedValue}
              onValueChange={onPickerChange}
              style={{ color: COLORS.FONT, width: '95%' }}
              dropdownIconColor={COLORS.FONT}
            >
              <Picker.Item
                color={
                  Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
                }
                label="Selecione o tipo de grupo..."
                value={undefined}
              />

              <Picker.Item
                color={
                  Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
                }
                key="whatsapp"
                label="WhatsApp"
                value="whatsapp"
              />
              <Picker.Item
                color={
                  Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
                }
                key="discord"
                label="Discord"
                value="discord"
              />
              <Picker.Item
                color={
                  Platform.OS === 'ios' ? COLORS.FONT : COLORS.BACKGROUND_DARK
                }
                key="telegram"
                label="Telegram"
                value="telegram"
              />
            </Picker>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Cadastrar"
              onPress={() => formRef.current?.submitForm()}
              style={{ marginBottom: SPACING.M }}
            />
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { ReleaseGroupForm };
