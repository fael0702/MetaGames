import { Router } from 'express';
import UsuarioController from './usuario.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export default class UsuarioRota {
  private router: Router;
  private controller: UsuarioController;

  constructor() {
    this.router = Router();
    this.controller = new UsuarioController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/criar', this.controller.criarUsuario);
    this.router.post('/login', this.controller.login);
    this.router.use(authMiddleware);
    this.router.get('/buscar/:id', this.controller.buscarPorId);
  }

  getRouter() {
    return this.router;
  }
}
