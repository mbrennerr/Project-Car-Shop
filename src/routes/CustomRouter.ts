import { Router } from 'express';
import Controller from '../controllers/genericController';
import Validate from '../middlewares/Validate';

export default class CustomRouter<T> {
  public router:Router;

  private validate;

  constructor() {
    this.router = Router();
    this.validate = Validate;
  }

  public addRoute(
    controller:Controller<T>,
    route:string = controller.route,
  ) {
    this.router.post(route, this.validate.Car, controller.create);
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.put(`${route}/:id`, this.validate.Car, controller.update);
  }
}