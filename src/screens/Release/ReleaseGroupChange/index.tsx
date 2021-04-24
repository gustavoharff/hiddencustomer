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
import moment from 'moment';

import { Input, Button, PickerIOS } from 'components';

import { SPACING } from 'styles';

import { useReleases } from 'hooks';

import { ReleaseDate } from 'types';

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

  const [groupsModalOpen, setGroupsModalOpen] = useState(false);
  const [datesModalOpen, setDatesModalOpen] = useState(false);

  const { group_id, release_id } = route.params;

  const initialReleaseGroup = useMemo(() => {
    return releases
      .find(release => release.id === release_id)
      ?.groups.find(group => group.id === group_id);
  }, [releases, group_id, release_id]);

  const formRef = useRef<FormHandles>(null);
  const [selectedGroup, setSelectedGroup] = useState(
    initialReleaseGroup?.type || '',
  );

  const [selectedDateId, setSelectedDateId] = useState(
    initialReleaseGroup?.release_date_id || '',
  );

  const navigation = useNavigation();

  const [loadingButton, setLoadingButton] = useState(false);

  const onPickerChange = useCallback(value => {
    setSelectedGroup(value);
  }, []);

  const onDateChange = useCallback(value => {
    setSelectedDateId(value);
  }, []);

  const dates = useMemo(() => {
    const releaseDates = [] as ReleaseDate[];
    const releaseFiltered = releases.filter(
      release => release_id === release.id,
    );

    releaseFiltered.map(release => {
      return release.dates.forEach(date => {
        releaseDates.push(date);
      });
    });

    return releaseDates;
  }, [release_id, releases]);

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

        await updateReleaseGroup({
          groupId: group_id,
          name: data.name,
          type: selectedGroup,
          release_date_id: selectedDateId,
        });

        navigation.navigate('ReleaseDetails');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
          return;
        }

        setLoadingButton(false);
      }
    },
    [selectedGroup, updateReleaseGroup, group_id, selectedDateId, navigation],
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

            <Label>Informe a data do lançamento: (Opcional)</Label>
            {Platform.OS === 'ios' ? (
              <>
                <Label
                  style={{ color: '#333' }}
                  onPress={() => setDatesModalOpen(true)}
                >
                  {(dates.find(date => date.id === selectedDateId)?.date &&
                    moment(
                      dates.find(date => date.id === selectedDateId)?.date,
                    ).format('LLL')) ||
                    'Selecionar'}
                </Label>
                <PickerIOS
                  modalIsVisible={datesModalOpen}
                  modalOnBackdropPress={() => setDatesModalOpen(false)}
                  items={dates.map(date => {
                    return {
                      ...date,
                      date: moment(date.date).format('L LT'),
                    };
                  })}
                  nameProp="date"
                  valueProp="id"
                  onValueChange={onDateChange}
                  selectedValue={selectedDateId}
                  buttonOnPress={() => {
                    setDatesModalOpen(false);
                  }}
                />
              </>
            ) : (
              <Picker
                mode="dialog"
                selectedValue={selectedDateId}
                onValueChange={onDateChange}
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

                {dates.map(date => (
                  <Picker.Item
                    key={date.id}
                    color="#3D3D4D"
                    label={moment(date.date).format('L LT')}
                    value={date.id}
                  />
                ))}
              </Picker>
            )}
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
