import { Review } from "../../entities/Review";
import reviewRepositorio from "./review.repositorio";

class reviewService {

    public async reviewsUsuario(id: number) {
        try {
            const review: Review[] = await reviewRepositorio.reviewsUsuario(id);

            return review;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new reviewService();