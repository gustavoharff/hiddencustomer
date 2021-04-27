import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

import { ReleaseDate, ReleaseGroup } from 'types';

import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseGroupForm: {
    release_id?: string;
    group?: ReleaseGroup;
  };
};

type ReleaseGroupFormProps = StackScreenProps<Params, 'ReleaseGroupForm'>;

export function ReleaseGroupForm({
  route,
}: ReleaseGroupFormProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDateId, setSelectedDateId] = useState('');

  const navigation = useNavigation();

  const [groupsModalOpen, setGroupsModalOpen] = useState(false);
  const [datesModalOpen, setDatesModalOpen] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const { createReleaseGroup, updateReleaseGroup, releases } = useReleases();

  useEffect(() => {
    if (route.params?.group) {
      navigation.setOptions({
        headerTitle: 'Registrar grupo',
      });
      setSelectedDateId(route.params?.group.release_date_id || '');
      setSelectedGroup(route.params?.group.type);
      formRef.current?.setFieldValue('name', route.params?.group.name);
    }
  }, [navigation, route.params?.group]);

  const onGroupChange = useCallback(value => {
    setSelectedGroup(value);
  }, []);

  const onDateChange = useCallback(value => {
    setSelectedDateId(value);
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

        if (route.params?.release_id) {
          await createReleaseGroup({
            name: data.name,
            type: selectedGroup,
            release_id: route.params.release_id,
            release_date_id: selectedDateId,
          });
        } else if (route.params?.group) {
          await updateReleaseGroup({
            groupId: route.params.group?.id,
            name: data.name,
            type: selectedGroup,
            release_date_id: selectedDateId,
          });
        }

        navigation.navigate('ReleaseDetails');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          setLoadingButton(false);
        }

        setLoadingButton(false);
      }
    },
    [
      selectedGroup,
      route.params?.release_id,
      route.params?.group,
      navigation,
      createReleaseGroup,
      selectedDateId,
      updateReleaseGroup,
    ],
  );

  const dates = useMemo(() => {
    const releaseDates = [] as ReleaseDate[];
    const releaseFiltered = releases.filter(
      release =>
        route.params?.release_id === release.id ||
        route.params.group?.release_id === release.id,
    );

    releaseFiltered.map(release => {
      return release.dates.forEach(date => {
        releaseDates.push(date);
      });
    });

    return releaseDates;
  }, [releases, route.params?.release_id, route.params.group?.release_id]);

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
                  onValueChange={onGroupChange}
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
                onValueChange={onGroupChange}
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
          title={route.params?.group ? 'Salvar' : 'Registrar'}
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
