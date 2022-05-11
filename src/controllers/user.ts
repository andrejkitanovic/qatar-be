import { RequestHandler } from 'express';

import { createMeta } from 'helpers/meta';
import User, { Roles } from 'models/user';
import codeList from 'helpers/list.json';

export const getSingleUser: RequestHandler = async (req, res, next) => {
	try {
		const { tag } = req.params;

		const user = await User.findOne({ tag: tag });

		let currentUser = false;
		if (user && req.auth?.id && user._id === req.auth.id) {
			currentUser = true;
		}
		res.json({
			data: {
				...user,
				currentUser,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const getUsers: RequestHandler = async (req, res, next) => {
	try {
		const users = await User.find({ role: Roles.USER });
		const count = await User.countDocuments({ role: Roles.USER });

		res.json({
			data: users,
			meta: createMeta({ count }),
		});
	} catch (err) {
		next(err);
	}
};

export const activateUser: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { activationCode } = req.body;

		await User.findByIdAndUpdate(id, {
			link: codeList.find(({code}) => code === activationCode)?.link,
		});

		res.json({
			message: 'User activated!',
		});
	} catch (err) {
		next(err);
	}
};
