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

      const token = jwt.sign({ id: usuario.id }, process.env.JWT_TOKEN, { expiresIn: '8h' });

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
}
