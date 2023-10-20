import { Express } from 'express';
import UsuarioRota from './usuario/usuario.rota';
import ReviewRota from './review/review.rota';
import JogoRota from './jogo/jogo.rota';
import { authMiddleware } from '../middlewares/authMiddleware';

export default class Rotas {
  private app: Express;
  private usuarioRota: UsuarioRota;
  private reviewRota: ReviewRota;
  private jogoRota: JogoRota;
  
  constructor(app: Express) {
    this.app = app;
    this.usuarioRota = new UsuarioRota();
    this.reviewRota = new ReviewRota();
    this.jogoRota = new JogoRota();
  }

  configurarRotas(): void {
    this.app.use(authMiddleware);
    this.app.use('/usuario', this.usuarioRota.getRouter());
    this.app.use('/review', this.reviewRota.getRouter());
    this.app.use('/jogo', this.jogoRota.getRouter());
  }
}
