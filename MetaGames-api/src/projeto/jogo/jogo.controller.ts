import { Response, Request } from 'express';
import JogoService from './jogo.service';

export default class JogoController {
  private reviewService: JogoService;

  constructor() {
    this.reviewService = new JogoService();
  }

}
