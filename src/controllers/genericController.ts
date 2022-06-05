import { NextFunction, Request, Response } from 'express';
import Service from '../service/genericService';

export type ResponseError = {
  error: unknown;
};
enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export default abstract class Controller<T> {
  abstract route: string;

  protected erros = ControllerErrors;

  constructor(protected service: Service<T>) {}

  abstract create(
    req: Request,
    res: Response<T | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract read(
    req: Request,
    res: Response<T[] | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract readOne(
    req: Request,
    res: Response<T | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract update(
    req: Request,
    res: Response<T | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;
  abstract delete(
    req: Request,
    res: Response<T | ResponseError>,
    next: NextFunction
  ): Promise<typeof res | void>;
} 