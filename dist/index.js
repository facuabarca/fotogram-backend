"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const server = new server_1.default();
// Body Parser (middleware)
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File Upload
server.app.use(express_fileupload_1.default());
// Configuración de CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app.
server.app.use('/user', user_routes_1.default);
server.app.use('/posts', post_routes_1.default);
// Conectar db
// mongoose.connect('mongodb://localhost:27017/fotosgram', // local
mongoose_1.default.connect('mongodb+srv://facuabarca:123456qA@fotosgram-sgj5u.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if (error) {
        throw error;
    }
    console.log('Base de datos ONLINE');
});
// Levantar express
server.start(() => { });
