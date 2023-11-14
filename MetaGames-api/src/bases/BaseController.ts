import { Response, Request } from 'express';

type ControllerMethod = (req: Request, res: Response) => Promise<void>;

export default class BaseController {
  protected bindMethods(): void {
    const prototype = Object.getPrototypeOf(this);

    Object.getOwnPropertyNames(prototype)
      .filter((name) => name !== 'constructor' && typeof prototype[name] === 'function')
      .forEach((methodName) => {
        const method = prototype[methodName];
        this[methodName] = method.bind(this);
      });
  }

  protected async executeMethod(method: ControllerMethod, req: Request, res: Response): Promise<void> {
    try {
      await method(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  protected handleError(res: Response, error: Error, status: number = 500): void {
    console.error(error);
    res.status(status).json({ message: 'Erro interno do servidor' });
  }
}