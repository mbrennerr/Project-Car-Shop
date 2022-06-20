import { Vehicle } from './VehicleInterface';

type CategoryTypes = 'Street' | 'Custom' | 'Trail';

export interface Motorcycle extends Vehicle {
  category:CategoryTypes;
  engineCapacity:number;
}