import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // o multer ainda usa a opçao de callback, por isso é feito da forma abaixo
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // se der erro, o callback irá retornar o erro
        if (err) return cb(err);
        // callback de sucesso concatenando um numero aleatorio + extensão do arquivo
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
