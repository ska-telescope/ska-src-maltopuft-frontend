import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc, { parseToLocal: false });

export default dayjs;
