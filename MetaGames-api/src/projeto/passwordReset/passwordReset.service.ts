import PasswordResetRepositorio from "./passwordReset.repositorio";

export default class PasswordResetService {

    private repositorio: PasswordResetRepositorio;

    constructor() {
        this.repositorio = new PasswordResetRepositorio();
    }

    public async confirmarCodigo(email: string, codigo: string) {
        try {
            const reset = await this.repositorio.buscarCodigo(email, codigo);

            if (reset) {
                await this.repositorio.apagarCodigo(reset);

                return true;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar codigo');
        }
    }
}