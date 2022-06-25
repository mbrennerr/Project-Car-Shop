import { Request, Response, NextFunction } from 'express';
import IErrorMap from '../interfaces/IErrorMap';

export const ErrorMap:IErrorMap = {
  badRequest: 400,
  notFound: 404,
  invalidInput: 400,
  conflict: 400,

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err:Error, _req:Request, res:Response, next:NextFunction) => {
  const { name } = err;
  const status:number = ErrorMap[name];
  // console.log('Middleware', err.name);
  if (!status) {
    return res.status(500).json({ message: err.message });
  }
  console.log(next);
  return res.status(status).json({ error: err.message });
};