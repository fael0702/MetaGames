import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsuarioRepositorio from '../projeto/usuario/usuario.repositorio';

type JwtPayload = {
  id: number;
  exp: number;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id, exp } = jwt.verify(token, process.env.JWT_TOKEN || '') as JwtPayload;
    const usuarioRepositorio = new UsuarioRepositorio();
    const usuario = await usuarioRepositorio.buscarPorId(id);

    if (!usuario) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    // Verifique a expiração do token
    const now = Math.floor(Date.now() / 1000);
    if (exp <= now) {
      return res.status(401).json({ error: 'Token expirado' });
    }

    delete usuario.senha;

    req.usuario = usuario;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
