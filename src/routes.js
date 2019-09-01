import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);
/*
routes.get('/', (req, res) => {
  return res.send('Rota principal');
});
*/
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// validação se tem o token ou seja, se esta autenticado. Valido para todas as rotas abaixo, pois é global
routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
