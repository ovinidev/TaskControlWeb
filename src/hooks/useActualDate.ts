interface UseActualDateProps {
	takeActualDate: () => string;
}

export const useActualDate = (): UseActualDateProps => {
	const takeActualDate = () => {
		const date = new Date();

		const day = String(date.getDate()).padStart(2, '0');
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		const actualDate = `${year}-${month}-${day}`;

		return actualDate;
	};

	return {
		takeActualDate,
	};
};
