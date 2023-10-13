import { error } from 'console';
import { Usuario } from '../../entities/Usuario';
import UsuarioRepositorio from './usuario.repositorio';

export default class UsuarioService {
    private usuarioRepositorio: UsuarioRepositorio;

    constructor() {
        this.usuarioRepositorio = new UsuarioRepositorio();
    }

    public async buscarPorId(id: number) {
        try {
            const usuario: Usuario = await this.usuarioRepositorio.buscarPorId(id);

            if (!usuario) {
                throw new Error('Usuario não encontrado');
            } else {
                return usuario;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Usuario não encontrado');
        }
    }

    public async criarUsuario(email: string, nome: string, senha: string, data: Date): Promise<void> {
        try {
            // Verificar se o usuário já existe
            const jaExiste = await this.usuarioRepositorio.findOneBy({ email });

            if (jaExiste) {
                throw new Error('Já existe um usuário com esse email!');
            }

            // Criar um novo usuário
            const usuario = new Usuario();
            usuario.email = email;
            usuario.nome = nome;
            usuario.senha = senha;
            usuario.data_nascimento = data;

            // Salvar o usuário
            await this.usuarioRepositorio.salvar(usuario);
        } catch (error) {
            throw new Error('Erro ao criar usuário');
        }
    }
}
