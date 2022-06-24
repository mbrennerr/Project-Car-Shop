import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotoModel from '../models/motorcyclesModel';
import GenericService from './genericService';

export default class MotoService extends GenericService<Motorcycle> {
  constructor(motoModel = new MotoModel()) {
    super(motoModel);
  }

  create = async (moto:Motorcycle):Promise<Motorcycle> => {
    const newMoto:Motorcycle = await this.model.create(moto);
    return newMoto;
  };
}