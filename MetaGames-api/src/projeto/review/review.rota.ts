import { Router } from 'express';
import reviewController from './review.controller';

const router = Router();

router.get('/:id', reviewController.reviewsUsuario);

export default router;