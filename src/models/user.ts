import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum Roles {
	ADMIN = 'admin',
	USER = 'user',
}
export type RoleType = `${Roles}`;

export interface IUser extends Document {
	_id: string;
	role: Roles;
	email: string;
	password: string;
	name: string;
	image: string;
	bio: string;
	links: {
		display: boolean;
		type: string;
		value: string;
	}[];
}

const userSchema: Schema = new Schema({
	role: {
		type: String,
		enum: Roles,
		required: true,
	},
	tag: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	name: {
		type: String,
		required: true,
	},
	image: String,
	bio: String,
	links: [
		{
			display: Boolean,
			type: String,
			value: String,
		},
	],
	activated: {
		type: Boolean,
		default: false,
	},
});

userSchema.pre('validate', async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});
const objectModel = model<IUser>('User', userSchema);

export default objectModel;
