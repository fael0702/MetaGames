import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Jogo } from "../../entities/Jogo";


export default class JogoRepositorio extends Repository<Jogo>{
  private repositorio: Repository<Jogo>;
  
  constructor(
    private dataSource?: DataSource,
    private entityManager?: EntityManager
  ) {
    super(Jogo, entityManager);
    this.repositorio = AppDataSource.getRepository(Jogo);
  }

}