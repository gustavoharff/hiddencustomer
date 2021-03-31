import { ReleaseDate } from 'types';
import moment from 'moment';

type FormatedDate = {
  [key: string]: { marked: boolean; dotColor: string };
};

export function formatMarkedCalendar(dates: ReleaseDate[]) {
  const formattedDates = {} as FormatedDate;

  dates.forEach(date => {
    formattedDates[moment(date.date).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: '#DC1637',
    };
  });

  return formattedDates;
}
