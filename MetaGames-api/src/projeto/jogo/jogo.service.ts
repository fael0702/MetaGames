import { Jogo } from "../../entities/Jogo";
import JogoRepositorio from "./jogo.repositorio";

export default class JogoService {

    private repositorio: JogoRepositorio;

    constructor() {
        this.repositorio = new JogoRepositorio();
    }

    public async criarJogo(nome: string, img: string, data: Date): Promise<Jogo> {
        try {
            const jaExiste = await this.repositorio.buscarPorNome(nome);

            if (jaExiste) {
                throw new Error('Já existe um jogo com esse nome!');
            }

            const jogo = new Jogo();
            jogo.nome = nome;
            jogo.background_image = img;
            jogo.data_lancamento = data;

            await this.repositorio.salvar(jogo);
            return jogo;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar usuário');
        }
    }

    public async buscarPorNome(nome: string): Promise<Jogo> {
        try {
            const jogo = await this.repositorio.buscarPorNome(nome);

            if (!jogo) {
                throw new Error('Jogo não encontrado');
            } else {
                return jogo;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Jogo não encontrado');
        }
    }

}
