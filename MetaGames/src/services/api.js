import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
class ApiService {

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
    });
  }

  async setAuthorizationHeader() {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async cadastroUsuario(nome, email, senha, dataNasc) {
    try {

      await this.axiosInstance.post('/usuario/criar', {
        nome,
        email,
        senha,
        dataNasc,
      });
      console.log('Usuário cadastrado!');
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar usuário: ', error);
      return false;
    }
  }

  async cadastroUsuarioGoogle(nome, email, idGoogle, img) {
    try {

      await this.axiosInstance.post('/usuario/criar-google', {
        nome,
        email,
        idGoogle,
        img,
      });
      console.log('Usuário cadastrado!');
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar usuário: ', error);
      return false;
    }
  }

  async login(email, senha) {
    try {

      const response = await this.axiosInstance.post('/usuario/login', {
        email,
        senha,
      });
      console.log('Usuário logado!');
      return response.data;
    } catch (error) {
      console.error('Erro ao efetuar login: ', error);
      return null;
    }
  }

  async verificarToken() {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.get(`/usuario/verificar`);
      return true;
    } catch (error) {
      console.error('Erro ao verificar token: ', error);
      return false;
    }
  }

  async logoff(token) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.get(`/usuario/logoff/${token}`);
      return true;
    } catch (error) {
      console.error('Erro ao fazer logoff: ', error);
      return false;
    }
  }

  async cadastroReview(comentario, nota, idJogo, idUsuario) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.post('/review/criar', {
        comentario,
        nota,
        idJogo,
        idUsuario
      });
      console.log('Review cadastrado!');
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar review: ', error);
      return null;
    }
  }

  async cadastroJogo(nome, img, data_lancamento) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.post('/jogo/criar', {
        nome,
        img,
        data_lancamento,
      });
      console.log('Jogo cadastrado!');
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar jogo: ', error);
      return null;
    }
  }

  async buscarJogo(nome) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.get(`/jogo/buscar/${nome}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar jogo: ', error);
      return null;
    }
  }

  async buscarUsuario(id) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.get(`/usuario/buscar/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar jogo: ', error);
      return null;
    }
  }

  async buscarPorEmail(email) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.get(`/usuario/buscar-email/${email}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuario: ', error);
      return null;
    }
  }

  async buscarReviewUsuario(idUsuario) {
    try {
      await this.setAuthorizationHeader();

      const response = await this.axiosInstance.get(`/review/buscar/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar as reviews: ', error);
      return null;
    }
  }

  async apagarReview(id) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.delete(`/review/apagar/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao buscar as reviews: ', error);
      return false;
    }
  }

  async alterarNome(nome, id) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.put(`/usuario/alterar-nome/${nome}/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao alterar nome: ', error);
      return false;
    }
  }

  async alterarImagem(id, uri) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.put(`/usuario/alterar-img`, { id, uri });

      console.log('Imagem alterada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao alterar a imagem: ', error);
      return false;
    }
  }

  async enviarCodigo(email) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.post(`/usuario/enviar-codigo/${email}`);

      console.log('Código enviado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao enviar código: ', error);
      return false;
    }
  }

  async alterarSenha(email, senha, codigo) {
    try {
      await this.setAuthorizationHeader();

      await this.axiosInstance.put(`/usuario/alterar-senha/${email}/${senha}/${codigo}`);

      console.log('Código enviado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao enviar código: ', error);
      return false;
    }
  }

}

export default new ApiService();