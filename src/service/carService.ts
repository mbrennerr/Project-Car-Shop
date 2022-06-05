import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/carModel';
import GenericService from './genericService';

export default class CarService extends GenericService<Car> {
  constructor(carModel = new CarModel()) {
    super(carModel);
  }
}
