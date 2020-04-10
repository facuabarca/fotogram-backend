import Server from "./classes/server";
import userRoutes from './routes/user-routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post.routes';

const server = new Server();


// Body Parser (middleware)
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());


// Rutas de mi app.
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar db
mongoose.connect('mongodb://localhost:27017/fotosgram',

	{ useNewUrlParser: true, useCreateIndex: true }, (error) => {
		if (error) {
			throw error;
		}

		console.log('Base de datos ONLINE');
	});

// Levantar express
server.start(() => { });

