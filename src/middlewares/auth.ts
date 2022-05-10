import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User, { RoleType } from 'models/user';

const auth: (roles: RoleType[]) => RequestHandler = (roles) => async (req, res, next) => {
	try {
		if (req?.headers?.authorization) {
			const authorization = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(authorization, process.env.DECODE_KEY ?? '');

			const { id } = decoded as { id: string };
			const user = await User.findById(id);

			if (!user) {
				res.status(403).json({ message: 'User Not Found!'});
			} else if (!roles.includes(user.role)) {
				res.status(403).json({ message:'User Not Authorized!'});
			} else {
				req.auth = {
					id
				};
				next();
			}
		} else res.status(403).json({ message: 'Missing Authorization Token!' });
	} catch (err) {
		res.status(500).json({ message: 'Network Error!' });
	}
};

export default auth;
