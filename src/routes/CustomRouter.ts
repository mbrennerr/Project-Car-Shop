import { Router } from 'express';
import Controller from '../controllers/genericController';
import Validate from '../middlewares/Validate';
import MotoController from '../controllers/motoController';

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
    if (controller instanceof MotoController) {
      this.router.post(route, this.validate.Motorcycle, controller.create);
      this.router
        .put(`${route}/:id`, this.validate.Motorcycle, controller.update);
      this.router.get(`${route}/:id`, controller.readOne);
      this.router.get(route, controller.read);
      this.router.delete(`${route}/:id`, controller.delete);
    } else {
      this.router.get(route, controller.read);
      this.router.get(`${route}/:id`, controller.readOne);
      this.router.post(route, this.validate.Car, controller.create);
      this.router.put(`${route}/:id`, this.validate.Car, controller.update);
      this.router.delete(`${route}/:id`, controller.delete);
    }
  } 
}