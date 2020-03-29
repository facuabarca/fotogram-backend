import Server from "./classes/server";
import userRoutes from './routes/user-routes';
import mongoose from 'mongoose';
const server = new Server();


// Rutas de mi app.
server.app.use('/user', userRoutes);

// Conectar db
mongoose.connect('mongodb://localhost:27017/fotosgram',
	{ useNewUrlParser: true, useCreateIndex: true }, (error) => {
		if(error) {
			throw error;
		}

		console.log('Base de datos ONLINE');
	});

// Levantar express
server.start(() => { });