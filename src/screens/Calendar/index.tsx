import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import './helper';

import { Button } from 'components';

import { useReleases } from 'hooks';

import { formatMarkedCalendar } from 'utils';

export function Calendar(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const {
    releasesDates,
    loadApiReleasesDates,
    loadLocalReleasesDates,
  } = useReleases();

  useEffect(() => {
    loadApiReleasesDates().catch(() => {
      loadLocalReleasesDates();
    });
  }, []);

  const onRefresh = useCallback(async () => {
    setLoading(true);

    try {
      await loadApiReleasesDates();
    } catch {
      await loadLocalReleasesDates();
    }
    setLoading(false);
  }, [loadApiReleasesDates, loadLocalReleasesDates]);

  return (
    <>
      <RNCalendar
        current={new Date()}
        markedDates={formatMarkedCalendar(releasesDates)}
        theme={{
          arrowColor: '#DC1637',
          dotStyle: {
            padding: 3,
            borderRadius: 9999,
          },
        }}
      />
      <View
        style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 20 }}
      >
        <Button loading={loading} title="Atualizar" onPress={onRefresh} />
      </View>
    </>
  );
}
