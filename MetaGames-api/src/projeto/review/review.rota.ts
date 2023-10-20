import { Router } from 'express';
import ReviewController from './review.controller';

export default class ReviewRota {
  private router: Router;
  private controller: ReviewController;

  constructor() {
    this.router = Router();
    this.controller = new ReviewController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/criar', this.controller.criarReview);
    this.router.get('/buscar/:id', this.controller.reviewsUsuario);
    this.router.delete('/apagar/:id', this.controller.apagarReview);
  }

  getRouter() {
    return this.router;
  }
}
