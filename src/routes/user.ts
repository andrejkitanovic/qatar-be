import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getSingleUser as getSingleUserController,
	getUsers as getUsersController,
	activateUser as activateUserController,
} from 'controllers/user';
// import { postLogin as postLoginValidator, postRegister as postRegisterValidator } from 'validators/auth';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/:tag',
		controller: getSingleUserController,
	},
	{
		method: 'get',
		route: '/',
		roles: ['admin'],
		controller: getUsersController,
	},
	{
		method: 'post',
		route: '/activate/:id',
		roles: ['admin'],
		// validator: postLoginValidator,
		controller: activateUserController,
	},
]);

export default router;
