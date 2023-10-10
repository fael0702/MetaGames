import { Express } from 'express';

import reviewRota from './review/review.rota';
import jogoRota from './jogo/jogo.rota';
import usuarioRota from './usuario/usuario.rota';

export default class Rotas {
  private app: Express;
  
  constructor(app: Express) {
    this.app = app;
  }

  configurarRotas(): void {
    this.app.use('/review', reviewRota);
    this.app.use('/jogo', jogoRota);
    this.app.use('/usuario', usuarioRota);
  }
}
