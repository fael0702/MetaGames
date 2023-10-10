import { Repository } from "typeorm";
import { Review } from "../../entities/Review";
import { AppDataSource } from "../../data-source";

class reviewRepositorio {
    private repositorio: Repository<Review>
    constructor() {
        this.repositorio = AppDataSource.getRepository(Review)
    }

    public async reviewsUsuario(id: number) {
        try {
            const qb = this.repositorio.createQueryBuilder('r')
            .innerJoinAndSelect('r.jogo', 'j')
                .where('r.usuario_id = :id')
                .setParameters({ id: id })

            return await qb.getMany()
        } catch (error) {
            console.error(error);
        }
    }
}

export default new reviewRepositorio();