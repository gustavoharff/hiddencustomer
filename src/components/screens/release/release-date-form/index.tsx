import React, { useCallback, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, DateTimeInput, Screen } from 'components';

import { SPACING } from 'styles';

import { api } from 'services';

import { ReleaseDate } from 'types';

import { Container, Label } from './styles';

type Params = {
  ReleaseDateForm: {
    release_id: string;
    setDates: React.Dispatch<React.SetStateAction<ReleaseDate[]>>;
  };
};

type ReleaseDateFormProps = StackScreenProps<Params, 'ReleaseDateForm'>;

export function ReleaseDateForm({ route }: ReleaseDateFormProps): JSX.Element {
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0)));

  const { setDates } = route.params;

  const [loadingButton, setLoadingButton] = useState(false);

  const navigation = useNavigation();

  const handleAddDate = useCallback(async () => {
    setLoadingButton(true);
    const response = await api.post<ReleaseDate>('/release/dates', {
      release_id: route.params.release_id,
      date: date.toISOString(),
    });

    setDates(state =>
      [...state, response.data].sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }

        if (a.date > b.date) {
          return -1;
        }

        return 0;
      }),
    );

    setLoadingButton(false);

    navigation.goBack();
  }, [date, navigation, route.params.release_id, setDates]);

  return (
    <Screen keyboard>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Label>Informe a data:</Label>
          <DateTimeInput date={date} setDate={setDate} />
        </Container>
      </ScrollView>
      <Button
        title="Cadastrar"
        loading={loadingButton}
        onPress={handleAddDate}
        style={{ marginBottom: SPACING.M }}
      />
    </Screen>
  );
}
