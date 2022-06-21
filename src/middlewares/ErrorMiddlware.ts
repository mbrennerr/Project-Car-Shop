import { Request, Response, NextFunction } from 'express';
import IErrorMap from '../interfaces/IErrorMap';

export const ErrorMap:IErrorMap = {
  badRequest: 400,
  notFound: 400,
  invalidInput: 400,
  conflict: 400,

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err:Error, _req:Request, res:Response, _next:NextFunction) => {
  const { name } = err;
  const status:number = ErrorMap[name];
  console.log('Middleware', err);
  if (!status) {
    return res.status(500).json({ message: err.message });
  }
  res.status(status).json({ message: err.message });
};