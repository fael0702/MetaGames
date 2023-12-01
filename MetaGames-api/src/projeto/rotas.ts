import { Express } from 'express';
import UsuarioRota from './usuario/usuario.rota';
import ReviewRota from './review/review.rota';
import JogoRota from './jogo/jogo.rota';
import { authMiddleware } from '../middlewares/authMiddleware';
import PasswordResetRota from './passwordReset/passwordReset.rota';

export default class Rotas {
  private app: Express;
  private usuarioRota: UsuarioRota;
  private reviewRota: ReviewRota;
  private jogoRota: JogoRota;
  private passwordResetRota: PasswordResetRota;
  
  constructor(app: Express) {
    this.app = app;
    this.usuarioRota = new UsuarioRota();
    this.reviewRota = new ReviewRota();
    this.jogoRota = new JogoRota();
    this.passwordResetRota = new PasswordResetRota();
  }

  configurarRotas(): void {
    this.app.use('/usuario', this.usuarioRota.getRouter());
    this.app.use('/passwordReset', this.passwordResetRota.getRouter());
    this.app.use(authMiddleware);
    this.app.use('/review', this.reviewRota.getRouter());
    this.app.use('/jogo', this.jogoRota.getRouter());
  }
}
