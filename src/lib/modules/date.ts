const jstDateFormatter = new Intl.DateTimeFormat("ja-JP", {
	timeZone: "Asia/Tokyo",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

export const formatJstDate = (date: string): string =>
	jstDateFormatter.format(new Date(date));
