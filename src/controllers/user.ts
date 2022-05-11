import { RequestHandler } from 'express';

import { createMeta } from 'helpers/meta';
import User, { Roles } from 'models/user';
import codeList from 'helpers/list.json';
import userList from 'helpers/users.json';

const insertUsers = async () => {
	const users = userList.map((user) => {
		const links = [];

		if (user['Call']) {
			links.push({
				display: true,
				type: 'phone',
				value: user['Call'],
			});
		}
		if (user['text']) {
			links.push({
				display: true,
				type: 'sms',
				value: user['text'],
			});
		}
		if (user['Instagram address']) {
			links.push({
				display: true,
				type: 'instagram',
				value: user['Instagram address'],
			});
		}
		if (user['WhatsApp']) {
			links.push({
				display: true,
				type: 'whatsapp',
				value: user['WhatsApp'],
			});
		}
		if (user['LinkedIn']) {
			links.push({
				display: true,
				type: 'linkedin',
				value: user['LinkedIn'],
			});
		}
		if (user['Website']) {
			links.push({
				display: true,
				type: 'website',
				value: user['Website'],
			});
		}

		return {
			role: 'user',
			email: user['Email'],
			password: '1234',
			name: user['First name'] + ' ' + user['Last name'],

			// links,
		};
	});
	// await User.deleteMany()
	await User.create(users)
};
insertUsers();

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
			link: codeList.find(({ code }) => code === activationCode)?.link,
		});

		res.json({
			message: 'User activated!',
		});
	} catch (err) {
		next(err);
	}
};
