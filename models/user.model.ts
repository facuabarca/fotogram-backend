
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

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

usuarioSchema.method('compararPassword', function (password: string = ''): boolean {
	if (bcrypt.compareSync(password, this.password))
		return true;
	else return false;
});

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	avatar?: string,
	compararPassword(password: string): boolean
}

export const User = model<IUser>('User', usuarioSchema);

