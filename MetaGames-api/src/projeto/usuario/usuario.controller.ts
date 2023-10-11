import { Response, Request } from 'express';
import usuarioService from './usuario.service';
const bcrypt = require('bcrypt');

class usuarioController {

  public async buscarPorId(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const usuario = await usuarioService.buscarPorId(id);
      
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
    }
  }

  public async criarUsuario(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const nome = req.body.nome;
      const data = new Date(req.body.dataNasc);
      const senha = await bcrypt.hash(req.body.senha, 10);

      await usuarioService.criarUsuario(email, nome, senha, data);

      return res.status(200).json({ message: 'Usuario cadastrado com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default new usuarioController();