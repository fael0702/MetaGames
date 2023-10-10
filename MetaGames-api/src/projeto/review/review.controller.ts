import { Response, Request } from 'express';
import reviewService from './review.service';

class reviewController {

    public async reviewsUsuario(req: Request, res: Response) {
        try {
            const reviewId = +req.params.id;
            
            const review = await reviewService.reviewsUsuario(reviewId);
      
            if (review.length) {
              return res.status(404).json({ message: 'Não foi encontrado nenhuma review para esse usuário' });
            }
      
            return res.status(200).json(review);
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
          }
    }
}

export default new reviewController();