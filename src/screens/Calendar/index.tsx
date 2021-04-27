import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import './helper';

import { HeaderIcon } from 'components';

import { useReleases } from 'hooks';

import { formatMarkedCalendar } from 'utils';

import { SPACING } from 'styles';

export function Calendar(): JSX.Element {
  const navigation = useNavigation();

  const {
    releasesDates,
    loadApiReleasesDates,
    loadLocalReleasesDates,
  } = useReleases();

  const onRefresh = useCallback(async () => {
    try {
      await loadApiReleasesDates();
    } catch {
      await loadLocalReleasesDates();
    }
  }, [loadApiReleasesDates, loadLocalReleasesDates]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name="reload"
          onPress={onRefresh}
          style={{ marginRight: SPACING.S }}
        />
      ),
    });
  }, [navigation, onRefresh]);

  useEffect(() => {
    loadApiReleasesDates().catch(() => {
      loadLocalReleasesDates();
    });
  }, []);

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
    </>
  );
}
