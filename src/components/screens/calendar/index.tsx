import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Agenda } from 'react-native-calendars';

import './helper';

import { HeaderIcon } from 'components';

import { markedDates, itemsDates } from 'utils';

import { colors, COLORS, SPACING } from 'styles';
import { api } from 'services';
import { Body, Small } from 'components/ui';
import moment from 'moment';

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
    <Agenda
      rowHasChanged={(r1, r2) => {
        return r1.name !== r2.name;
      }}
      renderEmptyData={() => {
        return (
          <View style={styles.emptyData}>
            <Body dark>Não há lançamentos para essa data!</Body>
          </View>
        );
      }}
      renderItem={(item, firstItemInDay) => {
        return (
          <>
            {firstItemInDay && <View style={styles.separator} />}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('ReleasesStack', {
                  screen: 'ReleaseDetails',
                  params: {
                    release_id: item.name.split('&')[0],
                  },
                });
              }}
            >
              <View style={styles.item}>
                <Small dark>Lançamento: {item.name.split('&')[1]}</Small>
                <Small dark>
                  Horário: {moment(item.name.split('&')[2]).format('LT')}
                </Small>
              </View>
            </TouchableOpacity>
          </>
        );
      }}
      renderEmptyDate={() => {
        return (
          <View style={styles.item}>
            <Small>Não há lançamentos para essa data!</Small>
          </View>
        );
      }}
      markedDates={markedDates(dates)}
      items={itemsDates(dates)}
      theme={{
        selectedDayBackgroundColor: colors.gray[900],
        todayTextColor: colors.red[500],
      }}
    />
  );
}

const styles = StyleSheet.create({
  emptyData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: COLORS.FONT,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
