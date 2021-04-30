import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import moment from 'moment';

import { Input, Button, Picker, Screen } from 'components';

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

        if (route.params?.release_id) {
          await createReleaseGroup({
            name: data.name,
            type: selectedGroup,
            release_id: route.params.release_id,
            release_date_id:
              selectedDateId !== 'null' ? selectedDateId : undefined,
          });
        } else if (route.params?.group) {
          await updateReleaseGroup({
            groupId: route.params.group?.id,
            name: data.name,
            type: selectedGroup,
            release_date_id: selectedDateId !== '' ? selectedDateId : undefined,
          });
        }

        navigation.navigate('ReleaseDetails');
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

            <Label>Informe o tipo do grupo:</Label>
            <Picker
              doneText="Selecionar"
              items={[
                { label: 'Selecionar', value: '' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Discord', value: 'discord' },
              ]}
              onChange={onGroupChange}
              value={selectedGroup}
              androidStyle={{ width: '100%' }}
            />

            <Label>Informe a data do lançamento: (Opcional)</Label>
            <Picker
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
