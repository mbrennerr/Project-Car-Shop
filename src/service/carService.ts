import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/carModel';
import GenericService from './genericService';

export default class CarService extends GenericService<Car> {
  constructor(carModel = new CarModel()) {
    super(carModel);
  }

  create = async (car:Car):Promise<Car> => {
    const newCar:Car = await this.model.create(car);
    return newCar;
  };
  
  readOne = async (id:string) => {
    const car:Car | null = await this.model.readOne(id);
    return car;
  };

  update = async (id:string, car:Car) => {
    const updatedCar:Car | null = await this.model.update(id, car);
    return updatedCar;
  };

  delete = async (id:string) => this.model.delete(id);
}
