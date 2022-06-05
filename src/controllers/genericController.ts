import { NextFunction, Request, Response } from 'express';
import GenericService from '../service/genericService';

export default abstract class GenericController<T> {
  protected Service:GenericService<T>;

  // constructor(protected Service:GenericService<T>){}
  constructor(serviço:GenericService<T>) {
    this.Service = serviço;
  }

  abstract create(
    req: Request,
    res: Response<T>,
    next: NextFunction
  ): Promise<typeof res | void>;
  // abstract read(
  //   req: Request,
  //   res: Response<T[] | ResponseError>,
  //   next: NextFunction
  // ): Promise<typeof res | void>;
  // abstract readOne(
  //   req: Request,
  //   res: Response<T | ResponseError>,
  //   next: NextFunction
  // ): Promise<typeof res | void>;
  // abstract update(
  //   req: Request,
  //   res: Response<T | ResponseError>,
  //   next: NextFunction
  // ): Promise<typeof res | void>;
  // abstract delete(
  //   req: Request,
  //   res: Response<T | ResponseError>,
  //   next: NextFunction
  // ): Promise<typeof res | void>;
} 