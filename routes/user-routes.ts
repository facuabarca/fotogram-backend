import { Router, Request, Response } from "express";
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, res: Response) => {
	res.json({
		ok: true,
		message: 'Todo funciona bien'
	});
});

userRoutes.post('/login', (req: Request, res: Response) => {
	const body = req.body;
	User.findOne({ email: body.email }, (err, userDB) => {
		if(err) throw err;

		if(!userDB) {
			return res.json({
				ok: false,
				mensaje: 'Usuario/Contraseña no son correctos'
			});
		}
		if(userDB.compararPassword(body.password)) {
			const userToken = Token.getJwtToken({
				_id: userDB._id,
				name: userDB.nombre,
				email: userDB.email,
				avatar: userDB.avatar
			});
			return res.json({
				ok: true,
				token: userToken
			});
		} else {
			return res.json({
				ok: false,
				mensaje: 'Usuario/Contraseña no son correctos *******'
			});
		}
		
	});

});

userRoutes.post('/create', (req: Request, res: Response) => {

	const user = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		avatar: req.body.avatar
	};

	

	User.create(user).then(userDb => {
		const userToken = Token.getJwtToken({
			_id: userDb._id,
			name: userDb.nombre,
			email: userDb.email,
			avatar: userDb.avatar
		});
		res.json({
			ok: true,
			user: userToken
		});
	}).catch(err => {
		res.json({
			ok: false,
			error: err
		})
	});


});


export default userRoutes;