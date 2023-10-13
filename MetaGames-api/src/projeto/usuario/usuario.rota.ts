import { Router } from 'express';
import UsuarioController from './usuario.controller';

export default class UsuarioRota {
  private router: Router;
  private controller: UsuarioController;

  constructor() {
    this.router = Router();
    this.controller = new UsuarioController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/buscar/:id', this.controller.buscarPorId);
    this.router.post('/criar', this.controller.criarUsuario);
  }

  getRouter() {
    return this.router;
  }
}
