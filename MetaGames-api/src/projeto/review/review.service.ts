import { Review } from '../../entities/Review';
import JogoRepositorio from '../jogo/jogo.repositorio';
import UsuarioRepositorio from '../usuario/usuario.repositorio';
import ReviewRepositorio from './review.repositorio';

export default class ReviewService {
    private repositorio: ReviewRepositorio;
    private jogoRepositorio: JogoRepositorio;
    private usuarioRepositorio: UsuarioRepositorio

    constructor() {
        this.repositorio = new ReviewRepositorio();
        this.jogoRepositorio = new JogoRepositorio();
        this.usuarioRepositorio = new UsuarioRepositorio();
    }

    public async reviewsUsuario(id: number) {
        try {
            const review = await this.repositorio.reviewsUsuario(id);

            return review;
        } catch (error) {
            console.error(error);
        }
    }

    public async criarReview(comentario: string, nota: number, idJogo: number, idUsuario: number): Promise<Review> {
        try {
            const jaExiste = await this.repositorio.buscarPorJogo(idJogo);

            if (jaExiste.length) {
                throw new Error('Já existe um usuário com esse email!');
            }

            const jogo = await this.jogoRepositorio.buscarPorId(idJogo);

            const usuario = await this.usuarioRepositorio.buscarPorId(idUsuario);

            const review = new Review();
            review.comentario = comentario;
            review.nota = nota;
            review.jogo = jogo;
            review.usuario = usuario;

            await this.repositorio.salvar(review);
            return review;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar review');
        }
    }

    public async apagarReview(id: number) {
        try {
            await this.repositorio.excluir(id);
        } catch (error) {
            console.error(error);
            throw new Error('Erro excluir review');
        }
    }
}
