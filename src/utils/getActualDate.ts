interface GetActualDateProps {
	actualDate: string;
}

export const getActualDate = (): GetActualDateProps => {
	const date = new Date();

	const isoStringDate = date.toISOString();

	const actualDate = isoStringDate.substring(0, 10);

	return {
		actualDate,
	};
};
