import { Response, Request } from 'express';
import UsuarioService from './usuario.service';
import UsuarioRepositorio from './usuario.repositorio';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BaseController from '../../bases/BaseController';

export default class UsuarioController extends BaseController {

  private service: UsuarioService;
  private repositorio: UsuarioRepositorio;

  constructor() {
    super();
    this.service = new UsuarioService();
    this.repositorio = new UsuarioRepositorio();
    this.bindMethods();
  }

  public async criarUsuario(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.body.email;
      const nome = req.body.nome;
      const dataNasc = new Date(req.body.dataNasc);
      const senha = await bcrypt.hash(req.body.senha, 10);

      await this.service.criarUsuario(email, nome, senha, dataNasc);

      res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    }, req, res);
  }

  public async criarUsuarioGoogle(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.body.email;
      const nome = req.body.nome;
      const idGoogle = req.body.idGoogle;
      const img = req.body.img;

      await this.service.criarUsuarioGoogle(email, nome, idGoogle, img);

      res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    }, req, res);
  }

  public async criarUsuarioFacebook(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.body.email;
      const nome = req.body.nome;
      const idFacebook = req.body.idFacebook;
      const img = req.body.img;

      await this.service.criarUsuarioFacebook(email, nome, idFacebook, img);

      res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    }, req, res);
  }

  public async login(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const usuario = await this.repositorio.buscarPorEmail(req.body.email);

      if (!usuario) {
        throw new Error('email inválidos');
      }

      if (!usuario.id_google) {
        const verificar = await bcrypt.compare(req.body.senha, usuario.senha);
  
        if (!verificar) {
          throw new Error('senha inválidos');
        }
      }

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_TOKEN, { expiresIn: '8h' });

      delete usuario.senha;

      res.json({
        usuario,
        token
      });
    }, req, res);
  }

  public async buscarPorId(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const id = +req.params.id;

      const usuario = await this.service.buscarPorId(id);

      if (usuario) {
        res.status(200).json(usuario);
      }
    }, req, res);
  }

  public async alterarNome(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const nome = req.params.nome;
      const id = +req.params.id;

      await this.service.alterarNome(nome, id);
      res.status(200).json({ message: 'Nome alterado com sucesso' });
    }, req, res);
  }

  public async alterarImg(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const id = +req.body.id;
      const uri = req.body.uri;

      await this.service.alterarImg(id, uri);
      res.status(200).json({ message: 'Imagem alterado com sucesso' });
    }, req, res);
  }

  public async enviarCodigo(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.params.email;

      await this.service.enviarCodigo(email);
      res.status(200).json({ message: 'Codigo enviado com sucesso' });
    }, req, res);
  }

  public async alterarSenha(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.params.email;
      const senha = await bcrypt.hash(req.params.senha, 10);

      await this.service.alterarSenha(email, senha);
      res.status(200).json({ message: 'Senha alterado com sucesso' });
    }, req, res);
  }

  public async verificarToken(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      res.status(200).json({ message: 'Token válido.' });
    }, req, res);
  }

  public async logoff(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const token = req.params.token;

      await this.service.logoff(token);

      res.status(200).json({ message: 'Usuário deslogado sucesso' });
    }, req, res);
  }

  public async buscarPorEmail(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const email = req.params.email;

      const usuario = await this.repositorio.buscarPorEmail(email);

      res.status(200).json(usuario);
    }, req, res);
  }
}
