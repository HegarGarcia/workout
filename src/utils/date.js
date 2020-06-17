import moment from 'moment';

const format = 'YYYY MM DD';

export function getToday() {
  return moment().format(format);
}

export function formatDate(date) {
  return moment(date).format(format);
}

export function getWeek() {
  const today = moment();

  return Array.from({ length: 7 }, (_, i) => {
    const date = today.day(i);
    return {
      date: formatDate(date),
      number: date.date(),
      weekDay: date.format('ddd')
    };
  });
}
