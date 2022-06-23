import { Response, NextFunction, Request } from 'express';
import { Car } from '../interfaces/CarInterface';
import Controller from './genericController';
import CarService from '../service/carService';

export default class CarController extends Controller<Car> {
  private _route:string;

  constructor(
    carService = new CarService(),
    route = '/cars',
  ) {
    super(carService);
    this._route = route;
    this.read = this.read.bind(this);
  }

  get route() { return this._route; }

  create = async (req:Request, res:Response, next:NextFunction) => {
    const { body } = req.body; 
    try {
      const newCar:Car | null = await this.Service.create(body);
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
          .json({ error: 'Id must have 24 hexadecimal characters' });
      }
      const car:Car | null = await this.Service.readOne(id);
      if (!car) {
        return res.status(404).json({ error: 'Object not found' });
      } 
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };
}
