"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
userRoutes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        message: 'Todo funciona bien'
    });
});
userRoutes.post('/login', (req, res) => {
    console.log('desde el celular');
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const userToken = token_1.default.getJwtToken({
                _id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                avatar: userDB.avatar
            });
            return res.json({
                ok: true,
                token: userToken
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos *******'
            });
        }
    });
});
userRoutes.post('/create', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    user_model_1.User.create(user).then(userDb => {
        const userToken = token_1.default.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email,
            avatar: userDb.avatar
        });
        res.json({
            ok: true,
            user: userToken
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});
// update user
userRoutes.post('/update', autenticacion_1.verifyToken, (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar
    };
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDb) => {
        if (err)
            throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                message: 'No existe un usuario con ese ID.'
            });
        }
        const userToken = token_1.default.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email,
            avatar: userDb.avatar
        });
        res.status(200).json({
            ok: true,
            token: userToken
        });
    });
});
userRoutes.get('/', autenticacion_1.verifyToken, (req, res) => {
    const usuario = req.user;
    res.json({
        ok: true,
        usuario
    });
});
exports.default = userRoutes;
