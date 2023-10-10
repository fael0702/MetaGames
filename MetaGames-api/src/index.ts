import express from 'express';
import { AppDataSource } from './data-source';
import Rotas from './projeto/rotas';

const iniciarServidor = async () => {
  try {
    // conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Conectado ao banco de dados');

    const app = express();
    app.use(express.json());

    // instância de Rotas e configurar as rotas
    const rotasDoProjeto = new Rotas(app);
    rotasDoProjeto.configurarRotas();

    // iniciar o servidor
    const porta = process.env.PORT || 3000;
    app.listen(porta, () => {
      console.log(`Servidor rodando na porta ${porta}`);
    });
  } catch (error) {
    console.log('Erro ao conectar no banco de dados: ');
    console.error(error);
  }
};

iniciarServidor();
