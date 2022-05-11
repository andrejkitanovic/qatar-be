import { body } from 'express-validator';
import bcrypt from 'bcryptjs';

import User from 'models/user';

export const postLogin = [
	body('email', 'email is required')
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage('email is not valid')
		.custom(async (value: string) => {
			const userExists = await User.exists({ email: value });

			if (!userExists) {
				throw new Error('user not found');
			}

			return true;
		}),
	body('password', 'password is required')
		.notEmpty()
		.custom(async (value: string, { req }) => {
			const user = await User.findOne({ email: req.body.email }).select('password');
			const isValidPassword = await bcrypt.compare(value, user?.password || '');

			if (!isValidPassword) {
				throw new Error('invalid password');
			}

			return true;
		}),
];

export const postRegister = [
	body('role', 'role is required').notEmpty(),
	body('email', 'email is required')
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage('email not valid')
		.custom(async (value: string) => {
			const userExists = await User.exists({ email: value });

			if (userExists) {
				throw new Error('email in use');
			}

			return true;
		}),
	body('password', 'password is required').notEmpty(),
	body('name', 'name is required').notEmpty(),
];
