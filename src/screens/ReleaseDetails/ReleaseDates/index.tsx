import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { SPACING } from 'styles';

import { DateTimeInput, Button } from 'components';

import { useReleases } from 'hooks';

import { Release } from 'types';

import { ReleaseDatesList } from './ReleaseDatesList';

import { Container } from './styles';

interface ReleaseDatedProps {
  release: Release;
}

export function ReleaseDates({ release }: ReleaseDatedProps): JSX.Element {
  const [date, setDate] = useState(new Date());
  const [isAddingDate, setIsAddingDate] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const { createReleaseDate } = useReleases();

  const handleAddDate = useCallback(async () => {
    await createReleaseDate({
      date,
      release_id: release.id,
    });

    setLoadingButton(false);
    setIsAddingDate(false);
  }, [createReleaseDate, date, release]);

  return (
    <Container>
      <ReleaseDatesList
        emptyListText="Não há datas cadastradas!"
        release_id={release.id}
      />

      {isAddingDate && (
        <>
          <DateTimeInput date={date} setDate={setDate} />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Salvar"
              loading={loadingButton}
              onPress={() => {
                handleAddDate();
                setLoadingButton(true);
              }}
            />
            <Button
              title="Cancelar"
              onPress={() => setIsAddingDate(false)}
              backgroundColor="#1B1B1F"
              textColor="#FFF"
              style={{ marginBottom: SPACING.XL }}
            />
          </View>
        </>
      )}
      {!isAddingDate && (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Button
            title="Adicionar data"
            onPress={() => setIsAddingDate(true)}
            style={{ marginBottom: SPACING.XL }}
          />
        </View>
      )}
    </Container>
  );
}
