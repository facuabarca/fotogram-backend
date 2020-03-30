import { Router, Request, Response } from "express";
import { User } from '../models/user.model';

const userRoutes = Router();

userRoutes.get('/prueba', (req: Request, res: Response) => {
	res.json({
		ok: true,
		message: 'Todo funciona bien'
	});
});

userRoutes.post('/create', (req: Request, res: Response) => {

	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		avatar: req.body.avatar
	};

	User.create(user).then(userDb => {
		res.json({
			ok: true,
			user: userDb
		});
	}).catch( err => {
		res.json({
			ok: false,
			error: err
		})
	});


});


export default userRoutes;