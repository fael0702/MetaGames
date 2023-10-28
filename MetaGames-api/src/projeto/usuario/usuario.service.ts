import { PasswordReset } from '../../entities/PasswordReset';
import { Usuario } from '../../entities/Usuario';
import PasswordResetRepositorio from '../passwordReset/passwordReset.repositorio';
import UsuarioRepositorio from './usuario.repositorio';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import fs from 'fs';
import base64js from 'base64-js';

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
          const binario = base64js.toByteArray(uri.replace(/^data:image\/[a-zA-Z]+;base64,/, ''));
      
          const formatoMatch = uri.match(/data:image\/([a-zA-Z]+)/);
          let formato: string;
      
          if (formatoMatch && formatoMatch.length === 2) {
            formato = formatoMatch[1];
          } else {
            throw new Error('Formato da imagem não detectado');
          }
      
          const imageTemp = `./tempImage.${formato}`;
      
          fs.writeFileSync(imageTemp, Buffer.from(binario));
      
          const auth = new google.auth.GoogleAuth({
            keyFile: process.env.GOOGLE_JSON,
            scopes: ['https://www.googleapis.com/auth/drive']
          });
      
          const driveService = google.drive({
            version: 'v3',
            auth
          });
      
          const fileMetaData = {
            name: `usuario_${id}.${formato}`,
            parents: [process.env.GOOGLE_DRIVE_ID]
          };
      
          const media = {
            mimeType: `image/${formato}`,
            body: fs.createReadStream(imageTemp)
          };
      
          const response = await driveService.files.create({
            requestBody: fileMetaData,
            media: media,
            fields: 'id'
          });
      
          fs.unlinkSync(imageTemp);
      
          const usuarioRepositorio = new UsuarioRepositorio();
          await usuarioRepositorio.alterarImg(id, response.data.id);
        } catch (error) {
          console.error(error);
          throw new Error('Erro ao alterar imagem do usuário');
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