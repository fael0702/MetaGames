import { Response, Request } from 'express';
import JogoService from './jogo.service';
import BaseController from '../../bases/BaseController';

export default class JogoController extends BaseController {

  private service: JogoService;

  constructor() {
    super();
    this.service = new JogoService();
    this.bindMethods();
  }

  public async criarJogo(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const nome = req.body.nome;
      const img = req.body.img;
      const dataLanc = req.body.data_lancamento;

      const jogo = await this.service.criarJogo(nome, img, dataLanc);

      res.status(200).json(jogo);
    }, req, res);
  }

  public async buscarPorNome(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const nome = req.params.nome;

      const jogo = await this.service.buscarPorNome(nome);
      res.status(200).json(jogo);
    }, req, res);
  }

}
