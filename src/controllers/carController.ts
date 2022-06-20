import { Request, Response, NextFunction } from 'express';
import { Car } from '../interfaces/CarInterface';
import genericController from './genericController';
import CarService from '../service/carService';

export default class CarController extends genericController<Car> {
  constructor(carService = new CarService()) {
    super(carService);
  }

  create = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const car:Car = req.body; 
      const newCar:Car | null = await this.Service.create(car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };  
}