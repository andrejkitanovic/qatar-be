import moduleAlias from 'module-alias'
moduleAlias.addAliases({
	helpers: __dirname + '/helpers',
	routes: __dirname + '/routes',
	models: __dirname + '/models',
	utils: __dirname + '/utils',
	controllers: __dirname + '/controllers',
	middlewares: __dirname + '/middlewares',
	validators: __dirname + '/validators',
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import storage from "helpers/storage";
import headersMiddleware from 'middlewares/headers';
import errorHandlerMiddleware from 'middlewares/errorHandler';
import connection from 'helpers/connection';

import routing from 'routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

storage(app);
app.use(headersMiddleware);
routing(app);
app.use(errorHandlerMiddleware);

connection(app);
