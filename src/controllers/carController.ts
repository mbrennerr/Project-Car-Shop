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
}
