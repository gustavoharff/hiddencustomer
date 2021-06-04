import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Calendar as RNCalendar } from 'react-native-calendars';

import './helper';

import { HeaderIcon } from 'components';

import { formatMarkedCalendar } from 'utils';

import { SPACING } from 'styles';
import { api } from 'services';

export function Calendar(): JSX.Element {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    api.get('/releases/dates/company').then(response => {
      setDates(response.data);
    });
  }, []);
  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    const response = await api.get('/releases/dates/company');

    setDates(response.data);
  }, []);

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

  return (
    <>
      <RNCalendar
        current={new Date()}
        markedDates={formatMarkedCalendar(dates)}
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
