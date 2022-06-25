import * as sinon from 'sinon'
import chai from 'chai';
import chaiHttp = require('chai-http');
import MotoModel from '../../../models/motorcyclesModel';
import MotoService from '../../../service/motoService';
import {Motorcycle} from '../../../interfaces/MotorcycleInterface';
import Sinon = require('sinon');
const {expect} =chai;
const MocksMoto = [{
  _id: "62b24693300466f3f6eceed6",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
},
{
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
},
]

describe('Testing Moto Service', () => {
  const model = new MotoModel();
  const service = new MotoService(model);
  
  describe('Testing Motorcycle creation', () => {
    before(()=>{
      Sinon.stub(model, 'create').resolves(MocksMoto[0]as Motorcycle);
    });

    after(()=>{
      (model.create as Sinon.SinonStub).restore();
    });

    it('should return created motorcycle', async () => {
      const result = await service.create(MocksMoto[1] as Motorcycle);
      expect(result).to.be.equal(MocksMoto[0]);
    });
  })

  describe('Testing Motorcycle listing',()=>{
    before(()=>{
      Sinon.stub(model, 'read').resolves(MocksMoto as Motorcycle[]);
    });
    after(()=>{
      (model.read as Sinon.SinonStub).restore();
    })

    it('should return all motorcycles', async ()=>{
      const result = await service.read();
      expect(result).to.be.equal(MocksMoto);
    })
  })

  describe('Testing a single motorcycle listing',()=>{
    before(()=>{
      Sinon.stub(model, 'readOne').resolves(MocksMoto[0]as Motorcycle);
    })
    after(()=>{
      (model.readOne as Sinon.SinonStub).restore();
    }
    )
    it('should return a single motorcycle', async ()=>{
      const result = await service.readOne(MocksMoto[0]._id as string);
      expect(result).to.be.equal(MocksMoto[0]);
    }
    ) 
  })
  
})