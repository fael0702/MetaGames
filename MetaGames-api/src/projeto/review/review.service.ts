import { Jogo } from '../../entities/Jogo';
import { Review } from '../../entities/Review';
import JogoRepositorio from '../jogo/jogo.repositorio';
import UsuarioRepositorio from '../usuario/usuario.repositorio';
import ReviewRepositorio from './review.repositorio';

export default class ReviewService {
    private reviewRepositorio: ReviewRepositorio;

    constructor(reviewRepositorio?: ReviewRepositorio) {
        this.reviewRepositorio = reviewRepositorio;
    }

    public async reviewsUsuario(id: number) {
        try {
            const reviewRepositorio = new ReviewRepositorio();
            const review = await reviewRepositorio.reviewsUsuario(id);

            return review;
        } catch (error) {
            console.error(error);
        }
    }

    public async criarReview(comentario: string, nota: number, idJogo: number, idUsuario: number): Promise<Review> {
        try {
            const reviewRepositorio = new ReviewRepositorio();
            const jaExiste = await reviewRepositorio.buscarPorJogo(idJogo);

            if (jaExiste.length) {
                throw new Error('Já existe um usuário com esse email!');
            }

            const jogoRepositorio = new JogoRepositorio();
            const jogo = await jogoRepositorio.buscarPorId(idJogo);

            const usuarioRepositorio = new UsuarioRepositorio();
            const usuario = await usuarioRepositorio.buscarPorId(idUsuario);

            const review = new Review();
            review.comentario = comentario;
            review.nota = nota;
            review.jogo = jogo;
            review.usuario = usuario;

            await reviewRepositorio.salvar(review);
            return review;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar review');
        }
    }

    public async apagarReview(id: number) {
        try {
            const reviewRepositorio = new ReviewRepositorio();
            await reviewRepositorio.excluir(id);
        } catch (error) {
            console.error(error);
            throw new Error('Erro excluir review');
        }
    }
}
