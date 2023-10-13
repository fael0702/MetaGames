import { Review } from '../../entities/Review';
import ReviewRepositorio from './review.repositorio';

export default class ReviewService {
    private reviewRepositorio: ReviewRepositorio;

    constructor() {
        this.reviewRepositorio = new ReviewRepositorio();
    }

    public async reviewsUsuario(id: number) {
        try {
            const review: Review[] = await this.reviewRepositorio.reviewsUsuario(id);

            return review;
        } catch (error) {
            console.error(error);
        }
    }
}
