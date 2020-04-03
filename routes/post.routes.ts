import { Router, Response } from 'express';
import { verifyToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

const postRoutes = Router();


// Obtener post
postRoutes.get('/', [verifyToken], async (req: any, res: Response) => { 

	let pagina = parseInt(req.query.pagina) || 1;
	let skip = pagina - 1;
	skip = skip * 10;
	const posts = await Post.find()
							.sort({_id: -1})
							.skip(skip)
							.limit(10)
							.populate('user', '-password')
							.exec();
	res.json({
		ok: true,
		posts
	})
});
// crear post
postRoutes.post('/', [verifyToken], (req: any, res: Response) => {

	const body = req.body;

	body.user = req.user._id;

	Post.create( body ).then( async postDb => {
		await postDb.populate('user', '-password').execPopulate();
		res.json({
			ok: true,
			post: postDb
		});
	}).catch(err => {
		res.json(err);
	})


});



export default postRoutes;