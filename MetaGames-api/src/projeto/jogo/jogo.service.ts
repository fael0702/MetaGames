import JogoRepositorio from "./jogo.repositorio";

export default class JogoService {
    private jogoRepositorio: JogoRepositorio;

    constructor() {
        this.jogoRepositorio = new JogoRepositorio();
    }

}
