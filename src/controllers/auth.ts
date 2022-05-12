import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from 'models/user';
import { sendEmailAccountCreated, sendEmailResetPassword, sendEmailPasswordChanged } from 'utils/mailer';

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

export const putMeImage: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		let image = null;
		if (req.file?.path) {
			image = 'https://qatar-be.herokuapp.com/uploads/' + req.file.path;
		}

		await User.findByIdAndUpdate(id, {
			image: image,
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

		let userLinks: any[] = user?.links || [];

		if (!userLinks.length) {
			userLinks = [newLink];
		} else {
			userLinks = userLinks.filter((single) => single.type !== newLink.type);
			userLinks = [...userLinks, newLink];
		}

		await User.findByIdAndUpdate(id, {
			links: userLinks,
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
		sendEmailAccountCreated({ email: email ?? '', name: name ?? '' });

		res.json({
			message: 'Successfully registered',
		});
	} catch (err) {
		next(err);
	}
};

export const postResetPassword: RequestHandler = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		sendEmailResetPassword({ email, id: user?._id ?? '' });

		res.json({
			message: 'Check your email',
		});
	} catch (err) {
		next(err);
	}
};

export const postChangePassword: RequestHandler = async (req, res, next) => {
	try {
		const { id, password } = req.body;
		const user = await User.findById(id);
		await User.findByIdAndUpdate(id, {
			password: password,
		});
		sendEmailPasswordChanged({ email: user?.email || '' });

		res.json({
			message: 'Password successfully changed',
		});
	} catch (err) {
		next(err);
	}
};
