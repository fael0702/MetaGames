import { Response, Request } from 'express';
import JogoService from './jogo.service';

export default class JogoController {

  public async criarJogo(req: Request, res: Response) {
    try {
      const nome = req.body.nome;
      const img = req.body.img;
      const dataLanc = req.body.data_lancamento;

      const jogoService = new JogoService();
      const jogo = await jogoService.criarJogo(nome, img, dataLanc);

      return res.status(200).json(jogo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar jogo' });
    }
  }

  public async buscarPorNome(req: Request, res: Response) {
    try {
      const jogoService = new JogoService();
      const nome = req.params.nome;

      const jogo = await jogoService.buscarPorNome(nome);
      return res.status(200).json(jogo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

}
