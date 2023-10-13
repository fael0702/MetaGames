import { Response, Request } from 'express';
import UsuarioService from './usuario.service';
import * as bcrypt from 'bcrypt';

export default class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public buscarPorId = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      const usuario = await this.usuarioService.buscarPorId(id);
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar usuário por ID' });
    }
  }

  public criarUsuario = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const nome = req.body.nome;
      const dataNasc = new Date(req.body.dataNasc);
      const senha = await bcrypt.hash(req.body.senha, 10);

      await this.usuarioService.criarUsuario(email, nome, senha, dataNasc);

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

}
