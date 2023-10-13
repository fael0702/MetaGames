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
    this.router.get('/:id', this.controller.reviewsUsuario);
  }

  getRouter() {
    return this.router;
  }
}
