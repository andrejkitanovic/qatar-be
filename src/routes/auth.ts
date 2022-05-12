import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getMe as getMeController,
	postChangePassword as postChangePasswordController,
	postLogin as postLoginController,
	postRegister as postRegisterController,
	postResetPassword as postResetPasswordController,
	putMe as putMeController,
	putMeImage as putMeImageController,
	putMeSocialMedia as putMeSocialMediaController,
} from 'controllers/auth';
import { postLogin as postLoginValidator, postRegister as postRegisterValidator } from 'validators/auth';

const router = Router();
defineRoutes(router, [
	{
		method: 'post',
		route: '/login',
		validator: postLoginValidator,
		controller: postLoginController,
	},
	{
		method: 'post',
		route: '/register',
		validator: postRegisterValidator,
		controller: postRegisterController,
	},
	{
		method: 'get',
		route: '/me',
		roles: ['admin', 'user'],
		controller: getMeController,
	},
	{
		method: 'post',
		route: '/reset-password',
		// validator: postRegisterValidator,
		controller: postResetPasswordController,
	},
	{
		method: 'post',
		route: '/change-password',
		// validator: postRegisterValidator,
		controller: postChangePasswordController,
	},
	{
		method: 'put',
		route: '/me',
		roles: ['admin', 'user'],
		controller: putMeController,
	},
	{
		method: 'put',
		route: '/me/image',
		roles: ['admin', 'user'],
		controller: putMeImageController,
	},
	{
		method: 'put',
		route: '/me/social-media',
		roles: ['admin', 'user'],
		controller: putMeSocialMediaController,
	},
]);

export default router;
