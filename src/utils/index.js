import { format, formatDistanceStrict } from 'date-fns';
import koLocale from 'date-fns/locale/ko';

const OPTS = {
  locale: koLocale
};

export default function getDateFormat(target) {
  const today = new Date();
  const date = new Date(target);
  const todayStr = ['sec', 'min', 'hour'];
  let distanceOfDate = formatDistanceStrict(today, date, {OPTS});
  let isToday = todayStr.some(item => distanceOfDate.indexOf(item) !== -1);

  if (isToday) {
    return format(date, "HH:mm", OPTS);
  } else {
    if (distanceOfDate.indexOf('1 day') !== -1) {
      return format(date, "'Yesterday'", OPTS);
    } else if (distanceOfDate.indexOf('month') !== -1) {
      return format(date, "MM'월' d'일", OPTS);
    } else {
      return format(date, "yy'년' MM'월' d'일", OPTS);
    }
  }
}
