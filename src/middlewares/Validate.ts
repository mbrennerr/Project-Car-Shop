import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import Schemas from '../controllers/Schemas/Schema';

export default class Validate {
  private static async validation(schema:ObjectSchema, body:unknown) {
    const { error } = await schema.validate(body);

    if (error) {
      const [{ type: errorType, message: errorMessage }] = error.details;
      // const {type,message} = error.details[0];
      // const errorType = error.details[0].type;
      // const errorMessage = error.details[0].message;
      const badRequest = { name: 'badRequest', message: errorMessage };
      const invalidInput = { name: 'invalidInput', message: errorMessage };
      console.log('validate.validation', error);
      if (errorType === 'any.required' || errorType === 'string.empty') {
        throw (badRequest as unknown);
      }

      throw (invalidInput as unknown);
    }
  }

  public static async Car(req:Request, res:Response, next:NextFunction) {
    try {
      await Validate.validation(Schemas.Car, req.body);

      return next();
    } catch (error) {
      console.error('Validate.Car', error);
      next(error);
    }
  }
}