import { Document, Schema, model as createModel } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './genericModel';

interface MotorcycleDocument extends Motorcycle, Document { }

const motoSchema = new Schema<MotorcycleDocument>(
  {
    category: String,
    engineCapacity: Number,
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
  },
  { versionKey: false },
);

export default class MotoModel extends GenericModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', motoSchema)) {
    super(model);
  }
}