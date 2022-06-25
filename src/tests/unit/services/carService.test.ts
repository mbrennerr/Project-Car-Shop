import * as Sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import {Car}  from '../../../interfaces/CarInterface';
// import Sinon = require('sinon');

const {expect}= chai;

const MocksCar = [{
  "_id": "628e564936a8a8cc4224bb14",
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "doorsQty": 2,
  "seatsQty": 2,
},
{
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "doorsQty": 2,
  "seatsQty": 2,
},]

describe('Car Service test suite', () => {
  const model = new CarModel();
  const service = new CarService(model);

  describe('POST/cars - Testing the creation of a car', () => {
    before(()=>{
      Sinon
      .stub(model, 'create')
      .resolves(MocksCar[0]as Car);
    });
    after(()=>{
      (model.create as Sinon.SinonStub).restore();
    })

    it('should return a car object ', async () => {
      const result = await service.create(MocksCar[1]);
      expect(result).to.be.equal(MocksCar[0]);
    })
  })

  describe('GET /cars - Testing the listing of all cars',()=>{
    before(()=>{
      Sinon
      .stub(model, 'read')
      .resolves(MocksCar as Car[]);
    });
    it('should return all cars already created', async ()=>{
      const result = await service.read();
      expect(result).to.be.equal(MocksCar);
    })
  });

  describe('GET/cars -Testing a single car listing',()=>{
    before(()=>{
      Sinon
      .stub(model, 'readOne')
      .resolves(MocksCar[0]as Car);
    })
    after(()=>{
      (model.readOne as Sinon.SinonStub).restore();
    })
    it('should return a single car', async ()=>{
      const result = await service.readOne('628e564936a8a8cc4224bb14');
      expect(result).to.be.equal(MocksCar[0]);
    })
  }) 

})