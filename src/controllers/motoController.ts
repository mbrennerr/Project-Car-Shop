import { Request, Response, NextFunction } from 'express';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import Controller from './genericController';
import MotoService from '../service/motoService';

export default class MotoController extends Controller<Motorcycle> {
  private _route:string;

  private labels = {
    ID_LENGTH: 'Id must have 24 hexadecimal characters',
    NOT_FOUND: 'Object not found',
  };

  constructor(
    motoService = new MotoService(),
    route = '/motorcycles',
  ) {
    super(motoService);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (req:Request, res:Response, next:NextFunction) => {
    const moto:Motorcycle = req.body;
    try {
      const newMoto:Motorcycle | null = await this.Service.create(moto);
      return res.status(201).json(newMoto);
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
      const moto:Motorcycle | null = await this.Service.readOne(id);
      if (!moto) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      }
      return res.status(200).json(moto);
    } catch (error) {
      next(error);
    }
  };

  update = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params;
    const moto:Motorcycle = req.body;
    try {
      if (id.length < 24) {
        return res
          .status(400)
          .json({ error: this.labels.ID_LENGTH });
      }
      const updatedMoto:Motorcycle | null = await this.Service.update(id, moto);
      if (!updatedMoto) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      }
      return res.status(200).json(updatedMoto);
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
      const deletedMoto:Motorcycle | null = await this.Service.delete(id);
      if (!deletedMoto) {
        return res.status(404).json({ error: this.labels.NOT_FOUND });
      }
      return res.status(204).json(deletedMoto);
    } catch (error) {
      next(error);
    }
  };
}