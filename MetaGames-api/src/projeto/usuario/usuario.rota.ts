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
    this.router.post('/criar-google', this.controller.criarUsuarioGoogle);
    this.router.post('/criar-facebook', this.controller.criarUsuarioFacebook);
    this.router.post('/login', this.controller.login);
    this.router.get('/buscar-email/:email', this.controller.buscarPorEmail);
    this.router.use(authMiddleware);
    this.router.get('/logoff/:token', this.controller.logoff);
    this.router.get('/verificar', this.controller.verificarToken);
    this.router.get('/buscar/:id', this.controller.buscarPorId);
    this.router.put('/alterar-nome/:nome/:id', this.controller.alterarNome);
    this.router.put('/alterar-img', this.controller.alterarImg);
    this.router.post('/enviar-codigo/:email', this.controller.enviarCodigo);
    this.router.put('/alterar-senha/:email/:senha', this.controller.alterarSenha);
  }

  getRouter() {
    return this.router;
  }
}
