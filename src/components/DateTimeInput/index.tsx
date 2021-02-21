import React, { useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { DateText, Container, TimeText, Content } from './styles';

interface DateTimeInputProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ date, setDate }) => {
  const [openedDate, setOpenedDate] = useState(false);
  const [openedTime, setOpenedTime] = useState(false);

  if (Platform.OS === 'android') {
    return (
      <Container>
        <Content>
          <TouchableOpacity onPress={() => setOpenedDate(true)}>
            <DateText>{moment(date).locale('pt-br').format('L')}</DateText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOpenedTime(true)}>
            <TimeText>{moment(date).locale('pt-br').format('LT')}</TimeText>
          </TouchableOpacity>
        </Content>

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
      </Container>
    );
  }

  return (
    <Container>
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
    </Container>
  );
};
export { DateTimeInput };
