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
  }

  getRouter() {
    return this.router;
  }
}
