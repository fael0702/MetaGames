import { Usuario } from '../../entities/Usuario';
import UsuarioRepositorio from './usuario.repositorio';

export default class UsuarioService {

    public async criarUsuario(email: string, nome: string, senha: string, data: Date): Promise<void> {
        try {
            const usuarioRepositorio = new UsuarioRepositorio();
            const jaExiste = await usuarioRepositorio.buscarPorEmail(email);

            if (jaExiste) {
                throw new Error('Já existe um usuário com esse email!');
            }

            const usuario = new Usuario();
            usuario.email = email;
            usuario.nome = nome;
            usuario.senha = senha;
            usuario.data_nascimento = data;

            await usuarioRepositorio.salvar(usuario);
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário');
        }

    }

    public async buscarPorId(id: number) {
        try {
            const usuarioRepositorio = new UsuarioRepositorio();
            const usuario = await usuarioRepositorio.buscarPorId(id);
            delete usuario.senha;
            return usuario;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar usuário');
        }
    }
}