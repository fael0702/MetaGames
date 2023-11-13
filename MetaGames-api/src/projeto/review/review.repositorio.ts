import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Review } from "../../entities/Review";


export default class ReviewRepositorio extends Repository<Review>{
  private repositorio: Repository<Review>;

  constructor(
    private entityManager?: EntityManager
  ) {
    super(Review, entityManager);
    this.repositorio = AppDataSource.getRepository(Review);
  }

  public async reviewsUsuario(id: number) {
    try {
      const qb = this.repositorio.createQueryBuilder('r')
        .innerJoinAndSelect('r.usuario', 'u')
        .innerJoinAndSelect('r.jogo', 'j')
        .where('r.usuario_id = :id')
        .setParameters({ id })

      return await qb.getMany()
    } catch (error) {
      console.error(error);
    }
  }

  public async buscarPorJogo(id: number) {
    try {
      const qb = this.repositorio.createQueryBuilder('r')
        .innerJoinAndSelect('r.jogo', 'j')
        .where('r.jogo_id = :id')
        .setParameters({ id })

      return await qb.getMany()
    } catch (error) {
      console.error(error);
    }
  }

  public async salvar(review: Review): Promise<Review> {
    try {
      return this.repositorio.save(review);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  public async excluir(id: number) {
    try {
      const result = await this.repositorio.delete({ id });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao excluir review');
    }
  }
}