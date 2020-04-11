import { Router, Response } from 'express';
import { verifyToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

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
		pagina,
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

// Servicio para subir archivos

postRoutes.post('/upload', [verifyToken], async (req: any, res: Response) => {
	

	

	if(!req.files) {
		return res.status(400).json({
			ok: false,
			message: 'No se subió ningun archivo'
		});
	}

	const file: FileUpload = req.files.image;

	if(!file) {
		return res.status(400).json({
			ok: false,
			message: 'No se subió ningun archivo - image'
		});
	}

	if(!file.mimetype.includes('image')) {
		return res.status(400).json({
			ok: false,
			message: 'Lo que subio no es una imagen'
		});
	}

	// Crear carpetas
	await fileSystem.guardarImagenTemporal(file, req.user._id)

	res.json({
		ok: true,
		file: file.mimetype
	});
});



export default postRoutes;