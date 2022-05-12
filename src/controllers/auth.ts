import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from 'models/user';
// import { sendEmailAccountCreated } from '../utils/mailer';

export const getMe: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		const me = await User.findById(id);

		res.json({
			data: me,
		});
	} catch (err) {
		next(err);
	}
};

export const putMe: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		await User.findByIdAndUpdate(id, {
			...req.body,
		});

		res.json({
			message: 'Successfully updated',
		});
	} catch (err) {
		next(err);
	}
};

export const putMeSocialMedia: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		const newLink = req.body;

		const user = await User.findById(id);
		if (!user) {
			throw new Error();
		}

		let links: any[] = [];
		if (user?.links) {
			links = [...user.links];
		}
		links = [...links, newLink];

		await User.findByIdAndUpdate(id, {
			links,
		});

		res.json({
			message: 'Successfully updated social link',
		});
	} catch (err) {
		next(err);
	}
};

export const postLogin: RequestHandler = async (req, res, next) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		const token = jwt.sign({ id: user?._id }, process.env.DECODE_KEY || '', {
			// expiresIn: "1h",
		});

		res.json({
			token,
			message: 'Successfully logged in',
		});
	} catch (err) {
		next(err);
	}
};

export const postRegister: RequestHandler = async (req, res, next) => {
	try {
		const { email, password, role, name } = req.body;

		await User.create({
			email,
			password,
			role,
			name,
		});
		// sendEmailAccountCreated(email);
		
		res.json({
			message: 'Successfully registered',
		});
	} catch (err) {
		next(err);
	}
};
