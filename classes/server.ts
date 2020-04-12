import express from 'express';

export default class Server {

	public app : express.Application;
	public port: number = 3000;

	constructor() {
		this.app = express();
	}

	start(callback: Function) {
		this.app.set('port', process.env.PORT || 3000);
		this.app.listen(this.app.get('port'), () => {
			console.log(`Server running in ${this.port}`);
		});
	}

}