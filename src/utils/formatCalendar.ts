import { ReleaseDate } from 'types';
import moment from 'moment';

type FormatedDates = {
  [key: string]: { marked: boolean; dotColor: string };
};

export function formatMarkedCalendar(dates: ReleaseDate[]): FormatedDates {
  const formatedDates = {} as FormatedDates;

  dates.forEach(date => {
    formatedDates[moment(date.date).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: '#DC1637',
    };
  });

  return formatedDates;
}
