import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import { SPACING } from 'styles';

import { DateTimeInput, Button } from 'components';

import { useReleases } from 'hooks';
import { ReleaseDatesList } from './ReleaseDatesList';

import { Container } from './styles';

interface ReleaseDatedProps {
  release_id: string;
}

export function ReleaseDates({ release_id }: ReleaseDatedProps): JSX.Element {
  const [date, setDate] = useState(new Date());
  const [isAddingDate, setIsAddingDate] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const { createReleaseDate } = useReleases();

  // const loadLocalReleaseDates = useCallback(async () => {
  //   if (!release_id) {
  //     return;
  //   }

  //   const realm = await getRealm();

  //   realm.write(() => {
  //     const data = realm
  //       .objects<ReleaseDate>('ReleaseDate')
  //       .filtered(`release_id == '${release_id}'`)
  //       .sorted('date', true);

  //     const formattedDates = data.map(releaseDate => ({
  //       id: releaseDate.id,
  //       date: releaseDate.date,
  //       release_id: releaseDate.release_id,
  //       created_at: releaseDate.created_at,
  //       updated_at: releaseDate.updated_at,
  //     }));

  //     setDates(formattedDates);
  //   });
  // }, [release_id]);

  const handleAddDate = useCallback(async () => {
    await createReleaseDate({
      date,
      release_id,
    });

    setLoadingButton(false);
    setIsAddingDate(false);
  }, [createReleaseDate, date, release_id]);

  return (
    <Container>
      <ReleaseDatesList
        emptyListText="Não há datas cadastradas!"
        release_id={release_id}
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
