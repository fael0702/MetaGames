import { PasswordReset } from '../../entities/PasswordReset';
import { Usuario } from '../../entities/Usuario';
import PasswordResetRepositorio from '../passwordReset/passwordReset.repositorio';
import UsuarioRepositorio from './usuario.repositorio';
import nodemailer from 'nodemailer';

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

    public async alterarNome(nome: string, id: number) {
        try {
            const usuarioRepositorio = new UsuarioRepositorio();
            await usuarioRepositorio.alterarNome(nome, id);
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao alterar nome do usuário');
        }
    }

    public async alterarImg(id: number, uri: string) {
        try {
            const usuarioRepositorio = new UsuarioRepositorio();
            await usuarioRepositorio.alterarImg(id, uri);
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao alterar nome do usuário');
        }
    }

    public async enviarCodigo(email: string) {
        try {
            const usuarioRepositorio = new UsuarioRepositorio();
            const usuario = usuarioRepositorio.buscarPorEmail(email);

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            const codigoConfirmacao = Math.floor(100000 + Math.random() * 900000).toString();

            const passwordResetRepositorio = new PasswordResetRepositorio();
            const passwordReset = new PasswordReset();

            passwordReset.email = email;
            passwordReset.codigo = codigoConfirmacao;

            await passwordResetRepositorio.salvar(passwordReset);

            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            })

            const opcoes = {
                from: process.env.EMAIL_SENDER,
                to: `${email}`,
                subject: 'Código de Confirmação',
                text: `Seu código de confirmação é: ${codigoConfirmacao}`
            }

            transporter.sendMail(opcoes, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao enviar email');
        }
    }

    public async alterarSenha(email: string, senha: string, codigo: string) {
        try {
            const passwordResetRepositorio = new PasswordResetRepositorio();
            const passwordReset = await passwordResetRepositorio.buscarCodigo(email, codigo);

            if (!passwordReset) {
                throw new Error(`Não existe codigo de vericação para o email: ${email}`);
            }
            await passwordResetRepositorio.remove(passwordReset);

            const usuarioRepositorio = new UsuarioRepositorio();
            await usuarioRepositorio.alterarSenha(email, senha);

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao alterar senha do usuário');
        }
    }
}