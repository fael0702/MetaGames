import { Response, Request } from 'express';
import UsuarioService from './usuario.service';
import UsuarioRepositorio from './usuario.repositorio';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class UsuarioController {

  public async criarUsuario(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const nome = req.body.nome;
      const dataNasc = new Date(req.body.dataNasc);
      const senha = await bcrypt.hash(req.body.senha, 10);

      const usuarioService = new UsuarioService();
      await usuarioService.criarUsuario(email, nome, senha, dataNasc);

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  public async login(req: Request, res: Response) {
    try {

      const usuarioRepositorio = new UsuarioRepositorio();
      const usuario = await usuarioRepositorio.buscarPorEmail(req.body.email);

      if (!usuario) {
        throw new Error('email ou senha inválidos');
      }

      const verificar = await bcrypt.compare(req.body.senha, usuario.senha);

      if (!verificar) {
        throw new Error('email ou senha inválidos');
      }

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_TOKEN, { expiresIn: '2m' });

      delete usuario.senha;

      return res.json({
        usuario,
        token
      })
    } catch (error) {
      console.error(error);
    }
  }

  public async buscarPorId(req: Request, res: Response) {
    try {
      const id = +req.params.id;

      const usuarioService = new UsuarioService();
      const usuario = await usuarioService.buscarPorId(id);

      if (usuario) {
        return res.status(200).json(usuario);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async alterarNome(req: Request, res: Response) {
    try {
      const nome = req.params.nome;
      const id = +req.params.id;

      const usuarioService = new UsuarioService();
      await usuarioService.alterarNome(nome, id);
      return res.status(200).json({ message: 'Nome alterado com sucesso' });
    } catch (error) {
      console.error(error);
    }
  }

  public async alterarImg(req: Request, res: Response) {
    try {
      const id = +req.body.id;
      const uri = req.body.uri;

      const usuarioService = new UsuarioService();
      await usuarioService.alterarImg(id, uri);
      return res.status(200).json({ message: 'Nome alterado com sucesso' });
    } catch (error) {
      console.error(error);
    }
  }

  public async enviarCodigo(req: Request, res: Response) {
    try {
      const email = req.params.email;

      const usuarioService = new UsuarioService();
      await usuarioService.enviarCodigo(email);
      return res.status(200).json({ message: 'Nome alterado com sucesso' });
    } catch (error) {
      console.error(error);
    }
  }

  public async alterarSenha(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const senha = await bcrypt.hash(req.body.senha, 10);
      const codigo = req.params.codigo;

      const usuarioService = new UsuarioService();
      await usuarioService.alterarSenha(email, senha, codigo);
      return res.status(200).json({ message: 'Nome alterado com sucesso' });
    } catch (error) {
      console.error(error);
    }
  }

  public async verificarToken(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Token válido." });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token inválido." });
    }
  }

  public async logoff(req: Request, res: Response) {
    try {
      const token = req.params.token;

      const usuarioService = new UsuarioService();
      await usuarioService.logoff(token);

      return res.status(200).json({ message: 'Usuário deslogado sucesso' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token inválido." });
    }
  }

}