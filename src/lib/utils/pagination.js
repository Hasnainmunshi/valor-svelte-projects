export function paginate(items, page = 1, limit = 12) {
	const start = (page - 1) * limit;
	return {
		data: items.slice(start, start + limit),
		totalPages: Math.ceil(items.length / limit)
	};
}
