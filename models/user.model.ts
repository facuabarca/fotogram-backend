
import { Schema, model, Document } from 'mongoose';

const usuarioSchema = new Schema({
	name: {
		type: String,
		required: [true, 'The name is necessary']
	},
	avatar: {
		type: String,
		default: 'av-1.png'
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'The email is necessary']
	},
	password: {
		type: String,
		required: [true, 'The password is necessary']
	}
});

interface IUser extends Document {
	nombre: string;
	email: string;
	password: string;
	avatar?: string
}

export const User = model<IUser>('User', usuarioSchema);

