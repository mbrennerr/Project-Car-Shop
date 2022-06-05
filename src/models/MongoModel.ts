import { Model as M, Document } from 'mongoose';
import Model from '../interfaces/ModelInterface';

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (object: T): Promise<T> => {
    const created = await this.model.create(object);

    return created;
  };

  read = async (): Promise<T[]> => {
    const find = await this.model.find({});

    return find;
  };

  readOne = async (value: string): Promise<T | null> => {
    const findedOne = await this.model.findOne({ _id: value });

    return findedOne;
  };

  update = async (str: string, object: T): Promise<T | null> => {
    const destructed = { ...object };
    const updated = this.model.findOneAndUpdate(
      { _id: str },
      { destructed },
      { new: true },
    );

    return updated;
  };

  delete = async (str: string): Promise<T | null> => {
    const deleted = await this.model.findOneAndDelete({ _id: str });
    return deleted;
  };
} 