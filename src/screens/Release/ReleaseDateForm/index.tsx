import React, { useCallback, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, DateTimeInput, Screen } from 'components';

import { useReleases } from 'hooks';

import { SPACING } from 'styles';

import { Container, Label } from './styles';

type Params = {
  ReleaseDateForm: {
    release_id: string;
  };
};

type ReleaseDateFormProps = StackScreenProps<Params, 'ReleaseDateForm'>;

export function ReleaseDateForm({ route }: ReleaseDateFormProps): JSX.Element {
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0)));

  const [loadingButton, setLoadingButton] = useState(false);

  const navigation = useNavigation();

  const { createReleaseDate } = useReleases();

  const handleAddDate = useCallback(async () => {
    setLoadingButton(true);
    await createReleaseDate({
      date,
      release_id: route.params.release_id,
    });

    setLoadingButton(false);

    navigation.goBack();
  }, [createReleaseDate, date, navigation, route.params.release_id]);

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
