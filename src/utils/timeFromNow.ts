import dayjs from "dayjs";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const timeFromNow = (timestamp: string) => {
	const time = dayjs(timestamp).locale("en").fromNow();
	return time;
};
