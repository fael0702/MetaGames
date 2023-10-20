import { Router } from 'express';
import JogoController from './jogo.controller';

export default class JogoRota {
  private router: Router;
  private controller: JogoController;

  constructor() {
    this.router = Router();
    this.controller = new JogoController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/criar', this.controller.criarJogo);
    this.router.get('/buscar/:nome', this.controller.buscarPorNome);
  }

  getRouter() {
    return this.router;
  }
}
