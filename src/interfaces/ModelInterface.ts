export interface Model<T>{
  create(object: T): Promise<T>;
  read():Promise<T[]>;
  readOne(value: string): Promise<T | null>;
  update(value:string, object:T):Promise<T | null>;
  delete(value:string):Promise<T | null>;
}