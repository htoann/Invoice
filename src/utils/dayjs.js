import dayjs from 'dayjs';

import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ja';
import 'dayjs/locale/vi';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

export default dayjs;
