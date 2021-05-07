import dayjs from 'dayjs';
import { stringToDate, timeFromNow } from './date';

describe('Date helper', () => {
  it('converts string to date', () => {
    expect(stringToDate('2000-01-01 12:00:00').getTime()).toBe(946724400000);
  });
  it('provides time from now', () => {
    expect(
      timeFromNow(dayjs().subtract(2, 'hours').format('YYYY-MM-DD HH:mm:ss'))
    ).toBe('a few seconds ago');
  });
});
