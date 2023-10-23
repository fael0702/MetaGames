import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import Rotas from './projeto/rotas';

const iniciarServidor = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conectado ao banco de dados');

    const app = express();
    app.use(express.json({ limit: '5mb' }));
    app.use(cors());

    const rotasDoProjeto = new Rotas(app);
    rotasDoProjeto.configurarRotas();

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
