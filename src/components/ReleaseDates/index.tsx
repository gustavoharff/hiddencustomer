import React, { useCallback, useEffect, useState } from 'react';

import { View } from 'react-native';
import { DateTimeInput } from '../DateTimeInput';

import { SPACING } from '../../styles/tokens';
import { Container } from './styles';
import { ReleaseDatesList } from '../ReleaseDatesList';
import Button from '../Button';
import api from '../../services/api';
import { ReleaseDate } from '../../schemas/releaseDate';
import getRealm from '../../services/realm';

interface ReleaseDatedProps {
  release_id: string;
}

const ReleaseDates: React.FC<ReleaseDatedProps> = ({ release_id }) => {
  const [date, setDate] = useState(new Date());
  const [isAddingDate, setIsAddingDate] = useState(false);
  const [dates, setDates] = useState<ReleaseDate[]>([]);

  useEffect(() => {
    getRealm().then(realm => {
      realm.write(() => {
        const data = realm
          .objects<ReleaseDate>('ReleaseDate')
          .filtered(`release_id = '${release_id}'`)
          .sorted('date', true);

        setDates(data as any);
      });
    });
  }, [release_id]);

  const onRefresh = useCallback(async () => {
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

  const handleAddDate = useCallback(async () => {
    const response = await api.post('/release/dates/', {
      release_id,
      date: date.toISOString(),
    });
    setDates(state => [...state, response.data]);
  }, [date, release_id]);

  return (
    <Container>
      <ReleaseDatesList
        dates={dates}
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
              style={{ marginBottom: SPACING.XL }}
            />
            <Button
              title="Cancelar"
              onPress={() => setIsAddingDate(false)}
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
