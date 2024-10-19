import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// Convert local time to UTC for storage
export const toUTC = (date: string | Dayjs | null) => {
	return dayjs(date).utc().format();
};

// Convert UTC to user's timezone
export const fromUTCtoLocal = (utcDate: string | Dayjs | null) => {
	const userTimezone = dayjs.tz.guess();
	return dayjs.utc(utcDate).tz(userTimezone);
};

// Format date for display
export const formatMonthDay = (date: string) => {
	return fromUTCtoLocal(date).format("dddd, MMMM D")
};

export const formatHourMinutes = (date: string) => {
	return fromUTCtoLocal(date).format("HH:mm")
};

