import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entities/Usuario";

class usuarioRepositorio {
    
    private repositorio: Repository<Usuario>;
    constructor() {
        this.repositorio = AppDataSource.getRepository(Usuario);
    }

    public async buscarPorId(id: number): Promise<Usuario> {

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

export default new usuarioRepositorio();