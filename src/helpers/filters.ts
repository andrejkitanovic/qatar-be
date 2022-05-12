import { Model } from 'mongoose';

interface IFilters {
	Model: Model<any>;
	query: any;
	populate?: string;
	searchFields?: string[];
	defaultFilters?: { [x: string]: any };
}

export const queryFilter = async ({ Model, query, searchFields, defaultFilters }: IFilters) => {
	// const sort = query.sort ?? '';
	// const limit = query.limit ?? 20;
	// const page = query.page ?? 1;
	const q = query.q ?? '';

	let findBy: { [x: string]: any } = defaultFilters ?? {};

	const search: { [x: string]: any }[] | any = [];

	if (q && searchFields) {
		searchFields.forEach((field) => {
			search.push({ [field]: { $regex: new RegExp(q, 'i') } });
		});
	}
	if (search.length) {
		findBy = { ...findBy, $or: search };
	}

    console.log(findBy)

	const data = await Model.find(findBy)
		// .populate({
		// 	path: populate ?? '',
		// })
		// .limit(limit)
		// .skip((page - 1) * limit)
		// .sort(sort);
	const count = await Model.countDocuments(findBy);

	return { data, count };
};
