import { Response, Request } from 'express';
import ReviewService from './review.service';
import BaseController from '../../bases/BaseController';

export default class ReviewController extends BaseController {

  private service: ReviewService;

  constructor() {
    super();
    this.service = new ReviewService();
    this.bindMethods();
  }

  public async criarReview(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const comentario = req.body.comentario;
      const nota = +req.body.nota;
      const idJogo = +req.body.idJogo;
      const idUsuario = +req.body.idUsuario;

      const review = await this.service.criarReview(comentario, nota, idJogo, idUsuario);

      res.status(200).json(review);
    }, req, res);
  }

  public async reviewsUsuario(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const usuarioId = +req.params.id;

      const review = await this.service.reviewsUsuario(usuarioId);

      if (review.length) {
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: 'Não foi encontrado nenhuma review para esse usuário' });
      }
    }, req, res);
  }

  public async apagarReview(req: Request, res: Response): Promise<void> {
    await this.executeMethod(async () => {
      const id = +req.params.id;

      await this.service.apagarReview(id);

      res.status(200).json({ message: 'Review excluida com sucesso' });
    }, req, res);
  }
}
