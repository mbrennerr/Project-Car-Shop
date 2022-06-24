import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class GenericModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (object: T): Promise<T> => {
    const created = await this.model.create(object);  
    console.log('Model_GENERIC', created);
    return created;
  };

  read = async (): Promise<T[]> => {
    const find = await this.model.find();
    console.log('Mode_READ_GENERIC', find);
    return find;
  };

  readOne = async (value: string): Promise<T | null> => {
    const findedOne = await this.model.findOne({ _id: value });

    return findedOne;
  };

  update = async (str: string, object:never): Promise<T | null> => {
    // TODO:usei o 'never' no tipo do object pq a tipo T estava dando sobrecarga no update:object...pesquisar melhor depois;
    const updated = this.model.findByIdAndUpdate(
      str,
      object,
      { new: true },
    );

    return updated;
  };

  delete = async (str: string): Promise<T | null> => {
    const deleted = await this.model.findOneAndDelete({ _id: str });
    return deleted;
  };
} 