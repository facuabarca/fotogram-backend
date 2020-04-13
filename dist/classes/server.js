"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.port = 3000;
        this.app = express_1.default();
    }
    start(callback) {
        this.app.set('port', process.env.PORT || 3000);
        console.log('El servidor esta ejecutando este puerto::: ', this.app.get('port'));
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server running in ${this.app.get('port')}`);
        });
    }
}
exports.default = Server;
