import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() { }

    guardarImagenTemporal(file: FileUpload, userId: string) {

        return new Promise((resolve, reject) => {
            // Crear carpetas
            const path = this.createCarpetaUsuario(userId);

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);

            // Mover archivo
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    private createCarpetaUsuario(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp/';

        const existe = fs.existsSync(pathUser);

        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp)
        }

        return pathUserTemp;
    }


    private generarNombreUnico(nombreOriginal: string) { //goku.copy.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();
        return `${idUnico}.${extension}`;
    }

    imagenesDeTempHaciaPost(userId: string) {

        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPosts = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPosts)) {
            fs.mkdirSync(pathPosts);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPosts}/${imagen}`);
        });

        return imagenesTemp;
    }

    private obtenerImagenesEnTemp(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

}