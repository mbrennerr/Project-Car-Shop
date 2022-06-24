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

  readOne = async (id:string) => {
    const moto:Motorcycle | null = await this.model.readOne(id);
    return moto;
  };

  update = async (id:string, moto:Motorcycle) => {
    const updatedMoto:Motorcycle | null = await this.model.update(id, moto);
    return updatedMoto;
  };

  delete = async (id:string) => this.model.delete(id);
}