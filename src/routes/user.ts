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
		route: '/:id',
		controller: getSingleUserController,
	},
	{
		method: 'get',
		route: '/',
		controller: getUsersController,
	},
	{
		method: 'post',
		route: '/activate/:id',
		// validator: postLoginValidator,
		controller: activateUserController,
	},
	// {
	// 	method: 'post',
	// 	route: '/register/:organisation',
	// 	validator: postRegisterValidator,
	// 	controller: postRegisterController,
	// },
]);

export default router;
