import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { SPACING, COLORS, BODY } from '../../styles/tokens';

interface DateTimeInputProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ date, setDate }) => {
  const [openedDate, setOpenedDate] = useState(false);
  const [openedTime, setOpenedTime] = useState(false);

  if (Platform.OS === 'android') {
    return (
      <View style={styles.placeHolderView}>
        <TouchableOpacity onPress={() => setOpenedDate(true)}>
          <Text style={styles.placeHolderText}>
            {moment(date).locale('pt-br').format('L')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenedTime(true)}>
          <Text style={styles.placeHolderText}>
            {moment(date).locale('pt-br').format('LT')}
          </Text>
        </TouchableOpacity>
        {openedDate && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={(event, selectedDate) => {
              setOpenedDate(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
              // onChange();
              // onChange(event, selectedDate);
            }}
            // is24Hour
          />
        )}

        {openedTime && (
          <DateTimePicker
            mode="time"
            value={date}
            onChange={(event, selectedDate) => {
              setOpenedTime(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
              // onChange();

              // onChange(event, selectedDate);
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.placeHolderView}>
      <DateTimePicker
        mode="datetime"
        value={date}
        style={{ marginLeft: 10 }}
        onChange={(event, selectedDate) => {
          // onChange(event, selectedDate);
          if (selectedDate) {
            setDate(selectedDate);

            // onChange();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolderView: {
    // flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  placeHolderText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: BODY.M.SIZE,
  },
  window: {
    backgroundColor: 'white',
    borderRadius: SPACING.M,
    padding: SPACING.M,
  },
});

export { DateTimeInput };
