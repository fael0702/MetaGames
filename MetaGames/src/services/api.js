import axios from 'axios';

const axiosCreate = axios.create({
  baseURL: 'http://localhost:3000'
})

const cadastro = async (nome, email, senha, dataNasc) => {
  axiosCreate.post('/usuario/criar', {
    nome: nome,
    email: email,
    senha: senha,
    dataNasc: dataNasc
  })
    .then(function (response) {
      console.log('Usuário cadastrado!', response.data);
    })
    .catch(function (error) {
      console.error('Erro ao cadastrar usuario: ', error);
    });
}

export default {
  cadastro
}
