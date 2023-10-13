import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Review } from "../../entities/Review";


export default class ReviewRepositorio extends Repository<Review>{
  private repositorio: Repository<Review>;
  
  constructor(
    private dataSource?: DataSource,
    private entityManager?: EntityManager
  ) {
    super(Review, entityManager);
    this.repositorio = AppDataSource.getRepository(Review);
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