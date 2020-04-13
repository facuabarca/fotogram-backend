import Server from "./classes/server";
import userRoutes from './routes/user-routes';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import postRoutes from './routes/post.routes';

const server = new Server();


// Body Parser (middleware)
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// File Upload

server.app.use(fileUpload());

// Configuración de CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de mi app.
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar db

// mongoose.connect('mongodb://localhost:27017/fotosgram', // local
mongoose.connect('mongodb+srv://facuabarca:123456qA@fotosgram-sgj5u.mongodb.net/test?retryWrites=true&w=majority',

	{ useNewUrlParser: true, useCreateIndex: true }, (error) => {
		if (error) {
			throw error;
		}

		console.log('Base de datos ONLINE');
	});

// Levantar express
server.start(() => { });

