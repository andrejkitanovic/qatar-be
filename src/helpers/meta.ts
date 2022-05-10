export const createMeta = ({ page = 1, size = 20, count }: { page?: number; size?: number; count: number }) => {
	return {
		pagination: {
			currentPage: page,
			pageSize: size,
			totalPages: Math.ceil(count / size),
			totalResults: count,
		},
	};
};
