import Model from '../interfaces/ModelInterface';

export default abstract class GenericService<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise<T | null> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | null> {
    return this.model.update(id, obj);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}
