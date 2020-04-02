import { Router, Response } from 'express';
import { verifyToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

const postRoutes = Router();

postRoutes.post('/', [verifyToken], (req: any, res: Response) => {

	const body = req.body;

	body.user = req.user._id;

	Post.create( body ).then( async postDb => {
		await postDb.populate('user').execPopulate();
		res.json({
			ok: true,
			post: postDb
		});
	}).catch(err => {
		res.json(err);
	})


});



export default postRoutes;