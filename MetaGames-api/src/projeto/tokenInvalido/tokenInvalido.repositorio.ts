import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TokenInvalido } from "../../entities/TokenInvalido";

export default class TokenInvalidoRepositorio extends Repository<TokenInvalido>{
  private repositorio: Repository<TokenInvalido>;

  constructor(
    private entityManager?: EntityManager
  ) {
    super(TokenInvalido, entityManager);
    this.repositorio = AppDataSource.getRepository(TokenInvalido);
  }

  public async salvar(tokenInvalido: TokenInvalido): Promise<TokenInvalido> {
    try {
      return this.repositorio.save(tokenInvalido);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  public async buscarToken(token: string) {
    try {
      const tokenInvalido = this.repositorio.findOneBy({ token })
      return tokenInvalido;
    } catch (error) {
      console.error(error);
    }
  }

}