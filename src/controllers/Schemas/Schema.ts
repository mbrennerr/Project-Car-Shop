import Joi, { ObjectSchema } from 'joi';
import { Car } from '../../interfaces/CarInterface';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';

export default class Schemas {
  public static get Car():ObjectSchema<Car> {
    return Joi.object({
      _id: Joi.string().min(24),
      model: Joi.string().min(3).required(),
      year: Joi.number().min(1900).max(2022).required(),
      color: Joi.string().min(3).required(),
      status: Joi.boolean(),
      buyValue: Joi.number().integer().required(),
      doorsQty: Joi.number().min(2).integer().required(),
      seatsQty: Joi.number().min(2).integer().required(),
    });
  }

  public static get Moto():ObjectSchema<Motorcycle> {
    return Joi.object({
      _id: Joi.string().min(24),
      model: Joi.string().min(3).required(),
      year: Joi.number().min(1900).max(2022).required(),
      color: Joi.string().min(3).required(),
      status: Joi.boolean(),
      buyValue: Joi.number().integer().required(),
      category: Joi.string().valid('Street', 'Custom', 'Trail').required(),
      engineCapacity: Joi.number().min(1).max(2500).required(),
    });
  }
}