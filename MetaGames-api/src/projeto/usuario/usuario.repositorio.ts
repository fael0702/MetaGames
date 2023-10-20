import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entities/Usuario";

export default class UsuarioRepositorio extends Repository<Usuario>{
  private repositorio: Repository<Usuario>;
  
  constructor(
    private entityManager?: EntityManager
  ) {
    super(Usuario, entityManager);
    this.repositorio = AppDataSource.getRepository(Usuario);
  }

  public async buscarPorEmail(email: string) {

    try {
      const usuario = this.repositorio.findOneBy({ email: email })
      return usuario;
    } catch (error) {
      console.error(error);
    }

  }
  public async buscarPorId(id: number) {

    try {
      const usuario = this.repositorio.findOneBy({ id: id })
      return usuario;
    } catch (error) {
      console.error(error);
    }

  }

  public async salvar(usuario: Usuario): Promise<Usuario> {

    try {
      return this.repositorio.save(usuario);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

  }
}