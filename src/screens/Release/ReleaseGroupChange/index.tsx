import React, { useCallback, useMemo, useRef, useState } from 'react';
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

import { useReleases } from 'hooks';

import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseGroupChange: {
    release_id: string;
    group_id: string;
  };
};

type ReleaseGroupChangeProps = StackScreenProps<Params, 'ReleaseGroupChange'>;

export function ReleaseGroupChange({
  route,
}: ReleaseGroupChangeProps): JSX.Element {
  const { releases, updateReleaseGroup } = useReleases();

  const { group_id, release_id } = route.params;

  const initialReleaseGroup = useMemo(() => {
    return releases
      .find(release => release.id === release_id)
      ?.groups.find(group => group.id === group_id);
  }, [releases, group_id, release_id]);

  const formRef = useRef<FormHandles>(null);
  const [selectedValue, setSelectedValue] = useState(initialReleaseGroup?.type);

  const navigation = useNavigation();

  const [loadingButton, setLoadingButton] = useState(false);

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

        await updateReleaseGroup({
          groupId: group_id,
          name: data.name,
          type: selectedValue,
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
    [selectedValue, updateReleaseGroup, group_id, navigation],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={
        getBottomSpace() + getStatusBarHeight(true) + SPACING.L * 5
      }
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <View style={{ width: '100%' }}>
            <Unform
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={initialReleaseGroup}
            >
              <Input
                name="name"
                label="Informe o nome do grupo:"
                placeholder="Nome"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>

            <Label>Informe o tipo do grupo:</Label>
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
        </Container>
      </ScrollView>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          title="Salvar"
          loading={loadingButton}
          onPress={() => {
            formRef.current?.submitForm();
            setLoadingButton(true);
          }}
          style={{ marginBottom: SPACING.M }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
