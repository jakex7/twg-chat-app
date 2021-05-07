import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
export const stringToDate = (str) => {
  let parts = str.split(' ');
  const date = parts[0];
  const time = parts[1];

  const dt = new Date();

  parts = date.split('-'); // Split date on - or /
  dt.setFullYear(parseInt(parts[0], 10));
  dt.setMonth(parseInt(parts[1], 10) - 1); // Months start at 0 in JS
  dt.setDate(parseInt(parts[2], 10));

  parts = time.split(':'); // Split time on :
  dt.setHours(parseInt(parts[0], 10));
  dt.setMinutes(parseInt(parts[1], 10));
  dt.setSeconds(parseInt(parts[2], 10));
  dt.setMilliseconds(0);
  return dt;
};
export const timeFromNow = (dateTimeString) =>
  dayjs(`${dateTimeString} +0000`, 'YYYY-MM-DD hh:mm:ss ZZ').fromNow();
