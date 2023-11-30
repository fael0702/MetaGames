import BaseController from "../../bases/BaseController";
import PasswordResetService from "./passwordReset.service";
import { Response, Request } from 'express';

export default class PasswordResetController extends BaseController {

    private service: PasswordResetService;

    constructor() {
        super();
        this.service = new PasswordResetService();
        this.bindMethods();
    }

    public async confirmarCodigo(req: Request, res: Response): Promise<void> {
        await this.executeMethod(async () => {
            const email = req.params.email;
            const codigo = req.params.codigo;

            const reset = await this.service.confirmarCodigo(email, codigo);

            if (reset) {
                res.status(200).json({ message: 'Codigo confirmado com sucesso' });;
            }
        }, req, res);
    }
}