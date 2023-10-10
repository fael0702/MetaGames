import { Usuario } from "../../entities/Usuario";
import usuarioRepositorio from "./usuario.repositorio";


class usuarioService {

    public async buscarPorId(id: number) {
        const usuario: Usuario = await usuarioRepositorio.buscarPorId(id);

        return usuario;
    }

    public async criarUsuario(email: string, nome: string, senha: string) {
        let usuario = new Usuario();

        usuario.email = email;
        usuario.nome = nome;
        usuario.senha = senha;

        usuarioRepositorio.salvar(usuario);
    }
}

export default new usuarioService();