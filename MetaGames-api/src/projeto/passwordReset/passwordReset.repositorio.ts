import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { PasswordReset } from "../../entities/PasswordReset";

export default class PasswordResetRepositorio extends Repository<PasswordReset>{
  private repositorio: Repository<PasswordReset>;

  constructor(
    private entityManager?: EntityManager
  ) {
    super(PasswordReset, entityManager);
    this.repositorio = AppDataSource.getRepository(PasswordReset);
  }

  public async salvar(passwordReset: PasswordReset): Promise<PasswordReset> {
    try {
      return this.repositorio.save(passwordReset);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  public async buscarCodigo(email: string, codigo: string) {
    try {
      const reset = this.repositorio.findOneBy({ email, codigo })
      return reset;
    } catch (error) {
      console.error(error);
    }
  }

  public async apagarCodigo(passwordReset: PasswordReset) {
    try {
      this.repositorio.remove(passwordReset);
    } catch (error) {
      console.error(error);
    }
  }

}