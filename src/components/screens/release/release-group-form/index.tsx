import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import moment from 'moment';

import { Input, Button, Picker, Screen, MultipleOptionInput } from 'components';

import { SPACING } from 'styles';

import { ReleaseDate, ReleaseGroup } from 'types';

import { api } from 'services';
import { Container, Unform, Label } from './styles';

type Params = {
  ReleaseGroupForm: {
    type: 'create' | 'update';
    release_id?: string;
    group?: ReleaseGroup;
    setGroups: React.Dispatch<React.SetStateAction<ReleaseGroup[]>>;
  };
};

type ReleaseGroupFormProps = StackScreenProps<Params, 'ReleaseGroupForm'>;

export function ReleaseGroupForm({
  route,
}: ReleaseGroupFormProps): JSX.Element {
  const { setGroups } = route.params;
  const formRef = useRef<FormHandles>(null);

  const [dates, setDates] = useState<ReleaseDate[]>([]);

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedDateId, setSelectedDateId] = useState('');

  const navigation = useNavigation();

  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (route.params.type === 'update' && route.params?.group) {
      navigation.setOptions({
        headerTitle: 'Registrar grupo',
      });
      setSelectedDateId(route.params?.group.release_date_id || '');
      setSelectedGroup(route.params?.group.type);
      formRef.current?.setFieldValue('name', route.params?.group.name);
    }
  }, [navigation, route.params?.group, route.params.type]);

  useEffect(() => {
    api.get(`/release/dates/${route.params.release_id}`).then(response => {
      setDates(response.data);
    });
  }, [route.params.release_id]);

  const onGroupChange = useCallback(value => {
    setSelectedGroup(value);
  }, []);

  const onDateChange = useCallback(value => {
    setSelectedDateId(value);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      setLoadingButton(true);
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

        if (route.params.type === 'create') {
          const response = await api.post('/release/groups', {
            name: data.name,
            type: selectedGroup,
            release_id: route.params.release_id,
            release_date_id:
              selectedDateId !== 'null' ? selectedDateId : undefined,
          });

          setGroups(state => [...state, response.data]);
        } else if (route.params.type === 'update' && route.params.group) {
          const response = await api.put(
            `/release/groups/${route.params.group.id}`,
            {
              name: data.name,
              type: selectedGroup,
              release_date_id: selectedDateId || undefined,
            },
          );

          setGroups(state =>
            state.map(group =>
              group.id === response.data.id ? response.data : group,
            ),
          );
        }

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Alert.alert('Atenção!', 'Complete o campo de nome');
          return;
        }
      }
      setLoadingButton(false);
    },
    [
      selectedGroup,
      route.params.type,
      route.params?.group,
      route.params.release_id,
      navigation,
      selectedDateId,
      setGroups,
    ],
  );

  return (
    <Screen keyboard>
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

            <MultipleOptionInput
              label="Informe o tipo do grupo"
              onChange={onGroupChange}
              value={selectedGroup}
              items={[
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Discord', value: 'discord' },
              ]}
            />

            <Picker
              label="Informe a data do lançamento (Opcional)"
              doneText="Selecionar"
              items={[
                { label: 'Selecionar', value: '' },
                ...dates.map(date => ({
                  label: moment(date.date).format('L LT'),
                  value: date.id,
                })),
              ]}
              onChange={onDateChange}
              value={selectedDateId}
              androidStyle={{ width: '100%' }}
            />
          </View>
        </Container>
      </ScrollView>
      <Button
        title={route.params?.group ? 'Salvar' : 'Registrar'}
        loading={loadingButton}
        onPress={() => {
          formRef.current?.submitForm();
        }}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
