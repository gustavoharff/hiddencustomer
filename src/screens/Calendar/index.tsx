import { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';

import { api } from 'services';

import { ReleaseDate } from 'types';

import { Button } from 'components';

import { useAuth } from 'hooks';

import { formatMarkedCalendar } from 'utils';

export function Calendar() {
  const [dates, setDates] = useState<ReleaseDate[]>([]);
  const [loading, setLoading] = useState(false);

  const { signOut } = useAuth();

  useEffect(() => {
    api
      .get('/release/dates/company')
      .then(response => {
        setDates(response.data);
      })
      .catch(err => {
        if (err.response.status === 440) {
          Alert.alert('Sessão expirada', 'Realize o login novamente!');
          signOut();
        }
      });
  }, [signOut]);

  const onRefresh = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/release/dates/company');
    setDates(response.data);

    setLoading(false);
  }, []);

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
      <View
        style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 20 }}
      >
        <Button loading={loading} title="Atualizar" onPress={onRefresh} />
      </View>
    </>
  );
}

LocaleConfig.locales.br = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'br';
