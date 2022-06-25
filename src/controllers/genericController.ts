import { NextFunction, Request, Response } from 'express';
import GenericService from '../services/genericService';

export type ResponseError = {
  error:unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
} 

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad Request',
}
export default abstract class GenericController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  protected Service:GenericService<T>;

  // constructor(protected Service:GenericService<T>){}
  constructor(serviço:GenericService<T>) {
    this.Service = serviço;
  }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
    
  ): Promise<typeof res | void> => {
    try {
      const objs:T[] = await this.Service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
  // o Método read ja vai ficar implementado por default;

  abstract readOne(
    req: Request,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract update(
    req: Request,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract delete(
    req: Request,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | void>;
} 