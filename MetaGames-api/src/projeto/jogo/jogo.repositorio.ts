import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Jogo } from "../../entities/Jogo";


export default class JogoRepositorio extends Repository<Jogo>{
  private repositorio: Repository<Jogo>;
  
  constructor(
    private entityManager?: EntityManager
  ) {
    super(Jogo, entityManager);
    this.repositorio = AppDataSource.getRepository(Jogo);
  }

  public async buscarPorNome(nome: string): Promise<Jogo> {
    try {
      const jogo = this.repositorio.findOneBy({ nome })
      return jogo;
    } catch (error) {
      console.error(error);
    }
  }

  public async buscarPorId(id: number): Promise<Jogo> {
    try {
      const jogo = this.repositorio.findOneBy({ id })
      return jogo;
    } catch (error) {
      console.error(error);
    }
  }

  public async salvar(jogo: Jogo): Promise<Jogo> {

    try {
      return this.repositorio.save(jogo);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

  }
}