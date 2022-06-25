import { Response, NextFunction, Request } from 'express';
import { Car } from '../interfaces/CarInterface';
import Controller from './genericController';
import CarService from '../services/carService';

export default class CarController extends Controller<Car> {
  private _route:string;

  private labels = {
    ID_LENGTH: 'Id must have 24 hexadecimal characters',
    NOT_FOUND: 'Object not found',
  };

  constructor(
    carService = new CarService(),
    route = '/cars',
  ) {
    super(carService);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (req:Request, res:Response, next:NextFunction) => {
    const car:Car = req.body;
    try {
      const newCar:Car | null = await this.Service.create(car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res
          .status(400)
          .json({ error: this.labels.ID_LENGTH });
      }
      const car:Car | null = await this.Service.readOne(id);
      if (!car) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      } 
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };

  update = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const car:Car = req.body;
    try {
      if (id.length < 24) {
        return res
          .status(400)
          .json({ error: this.labels.ID_LENGTH });
      }
      const updatedCar:Car | null = await this.Service.update(id, car);
      if (!updatedCar) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      }
      // console.log('CONTROLLER_UPDATE', updatedCar);
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res
          .status(400)
          .json({ error: this.labels.ID_LENGTH });
      }
      const deletedCar:Car | null = await this.Service.delete(id);
      if (!deletedCar) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      }
      return res.status(204).json({});
    } catch (error) {
      next(error);
    }
  };
}
