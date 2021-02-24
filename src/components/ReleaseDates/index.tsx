import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { COLORS, SPACING } from 'styles';

import { DateTimeInput, Button, ReleaseDatesList } from 'components';

import { api, getRealm } from 'services';

import { ReleaseDate } from 'types';

import { Container } from './styles';

type ReleaseDatedProps = {
  release_id: string;
};

const ReleaseDates: React.FC<ReleaseDatedProps> = ({ release_id }) => {
  const [date, setDate] = useState(new Date());
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [dates, setDates] = useState<ReleaseDate[]>([]);

  const loadApiReleaseDates = useCallback(async () => {
    if (!release_id) {
      return;
    }

    const response = await api.get(`/release/dates/${release_id}`);
    setDates(response.data);

    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects('ReleaseDate')
        .filtered(`release_id == '${release_id}'`)
        .sorted('date', true);

      realm.delete(data);
      response.data.map((releaseDate: ReleaseDate) =>
        realm.create('ReleaseDate', releaseDate),
      );
    });
  }, [release_id]);

  const loadLocalReleaseDates = useCallback(async () => {
    if (!release_id) {
      return;
    }

    const realm = await getRealm();

    realm.write(() => {
      const data = realm
        .objects<ReleaseDate>('ReleaseDate')
        .filtered(`release_id == '${release_id}'`)
        .sorted('date', true);

      const formattedDates = data.map(releaseDate => ({
        id: releaseDate.id,
        date: releaseDate.date,
        release_id: releaseDate.release_id,
        created_at: releaseDate.created_at,
        updated_at: releaseDate.updated_at,
      }));

      setDates(formattedDates);
    });
  }, [release_id]);

  useEffect(() => {
    loadApiReleaseDates().catch(() => {
      loadLocalReleaseDates();
    });
  }, [loadApiReleaseDates, loadLocalReleaseDates, release_id]);

  const onRefresh = useCallback(async () => {
    loadApiReleaseDates().catch(() => {
      loadLocalReleaseDates();
    });
  }, [loadApiReleaseDates, loadLocalReleaseDates]);

  const handleAddDate = useCallback(async () => {
    const response = await api.post('/release/dates', {
      release_id,
      date: date.toISOString(),
    });

    setDates(state => [...state, response.data]);

    const realm = await getRealm();

    realm.write(() => {
      realm.create('ReleaseDate', response.data);
    });
  }, [date, release_id]);

  return (
    <Container>
      <ReleaseDatesList
        dates={dates}
        setDates={setDates}
        onRefresh={onRefresh}
        emptyListText="Não há datas!"
      />

      {isAddingDate && (
        <>
          <DateTimeInput date={date} setDate={setDate} />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Button
              title="Salvar"
              onPress={() => {
                setIsAddingDate(false);
                handleAddDate();
              }}
            />
            <Button
              title="Cancelar"
              onPress={() => setIsAddingDate(false)}
              backgroundColor={COLORS.ALERT}
              textColor={COLORS.FONT}
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
};
export { ReleaseDates };
