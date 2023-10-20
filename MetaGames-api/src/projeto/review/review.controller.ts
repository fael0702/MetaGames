import { Response, Request } from 'express';
import ReviewService from './review.service';

export default class ReviewController {

  public async criarReview(req: Request, res: Response) {
    try {
      const comentario = req.body.comentario;
      const nota = +req.body.nota;
      const idJogo = +req.body.idJogo;
      const idUsuario = +req.body.idUsuario;

      const reviewService = new ReviewService();
      const review = await reviewService.criarReview(comentario, nota, idJogo, idUsuario);

      return res.status(200).json(review);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar review' });
    }
  }

  public async reviewsUsuario(req: Request, res: Response) {
    try {
      const usuarioId = +req.params.id;

      const reviewService = new ReviewService();
      const review = await reviewService.reviewsUsuario(usuarioId);

      if (review.length) {
        return res.status(200).json(review);
        
      } else {
        return res.status(404).json({ message: 'Não foi encontrado nenhuma review para esse usuário' });
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  public async apagarReview(req: Request, res: Response) {
    try {
      const id = +req.params.id;

      const reviewService = new ReviewService();
      await reviewService.apagarReview(id);

      return res.status(200).json({ message: 'Review excluida com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

}
