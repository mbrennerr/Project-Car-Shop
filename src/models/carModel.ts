import { Document, Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './genericModel';

interface CarDocument extends Car, Document{}

const carSchema = new Schema<CarDocument>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

export default class CarModel extends GenericModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}