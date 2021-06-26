import { ReleaseDate } from 'types';
import moment from 'moment';

type MarkedDates = {
  [date: string]: { marked: boolean; dotColor: string; disabled: boolean };
};

type ItemsDates = {
  [date: string]: [{ name: string }];
};

export function markedDates(dates: ReleaseDate[]): MarkedDates {
  const formatedDates = {} as MarkedDates;

  dates.forEach(date => {
    formatedDates[moment(date.date).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: '#DC1637',
      disabled: false,
    };
  });

  return formatedDates;
}

export function itemsDates(dates: ReleaseDate[]) {
  const fomatedItems = {} as ItemsDates;

  dates.forEach(date => {
    if (fomatedItems[moment(date.date).format('YYYY-MM-DD')]) {
      fomatedItems[moment(date.date).format('YYYY-MM-DD')].push({
        name: `${date.release_id}&${date.release?.name as string}&${date.date}`,
      });
    } else {
      fomatedItems[moment(date.date).format('YYYY-MM-DD')] = [
        {
          name: `${date.release_id}&${date.release?.name as string}&
          ${date.date}`,
        },
      ];
    }
  });

  return fomatedItems;
}
