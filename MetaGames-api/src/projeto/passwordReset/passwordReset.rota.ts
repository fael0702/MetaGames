import { Router } from "express";
import PasswordResetController from "./passwordReset.controller";

export default class PasswordResetRota {
    private router: Router;
    private controller: PasswordResetController;

    constructor() {
        this.router = Router();
        this.controller = new PasswordResetController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/confirmar/:email/:codigo', this.controller.confirmarCodigo)
    }

    getRouter() {
        return this.router;
    }
}