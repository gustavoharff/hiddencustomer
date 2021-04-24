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

import { Input, Button, PickerIOS } from 'components';

import { SPACING } from 'styles';

import { useReleases } from 'hooks';

import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseDetails: {
    release_id: string;
  };
};

type ReleaseGroupFormProps = StackScreenProps<Params, 'ReleaseDetails'>;

export function ReleaseGroupForm({
  route,
}: ReleaseGroupFormProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigation = useNavigation();

  const [groupsModalOpen, setGroupsModalOpen] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const { createReleaseGroup } = useReleases();

  const onPickerChange = useCallback(value => {
    setSelectedGroup(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        if (!selectedGroup) {
          Alert.alert('Atenção', 'Selecione algum tipo de grupo!');
          setLoadingButton(false);
          return;
        }

        await createReleaseGroup({
          name: data.name,
          type: selectedGroup,
          release_id: route.params.release_id,
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
    [navigation, selectedGroup, createReleaseGroup, route.params.release_id],
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
            <Unform ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Informe o nome do grupo:"
                placeholder="Nome"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Unform>

            <Label>Informe o tipo do grupo:</Label>
            {Platform.OS === 'ios' ? (
              <>
                <Label
                  style={{ color: '#333' }}
                  onPress={() => setGroupsModalOpen(true)}
                >
                  {selectedGroup === 'whatsapp' && 'WhatsApp'}
                  {selectedGroup === 'discord' && 'Discord'}
                  {selectedGroup === 'telegram' && 'Telegram'}
                  {!selectedGroup && 'Selecionar'}
                </Label>
                <PickerIOS
                  modalIsVisible={groupsModalOpen}
                  modalOnBackdropPress={() => setGroupsModalOpen(false)}
                  items={[
                    { value: 'whatsapp', label: 'WhatsApp' },
                    { value: 'telegram', label: 'Telegram' },
                    { value: 'discord', label: 'Discord' },
                  ]}
                  nameProp="label"
                  valueProp="value"
                  onValueChange={onPickerChange}
                  selectedValue={selectedGroup}
                  buttonOnPress={() => {
                    if (!selectedGroup) {
                      Alert.alert('Selecione um grupo!');
                      return;
                    }
                    setGroupsModalOpen(false);
                  }}
                />
              </>
            ) : (
              <Picker
                mode="dialog"
                selectedValue={selectedGroup}
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
            )}
          </View>
        </Container>
      </ScrollView>
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
    </KeyboardAvoidingView>
  );
}
