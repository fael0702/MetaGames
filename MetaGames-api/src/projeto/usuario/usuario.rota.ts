import { Router } from 'express';
import usuarioController from './usuario.controller';

const router = Router();

router.get('/buscar/:id', usuarioController.buscarPorId);
router.post('/criar', usuarioController.criarUsuario);

export default router;