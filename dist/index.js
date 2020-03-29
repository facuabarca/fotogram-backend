"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = new server_1.default();
// Rutas de mi app.
server.app.use('/user', user_routes_1.default);
// Conectar db
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => { });
