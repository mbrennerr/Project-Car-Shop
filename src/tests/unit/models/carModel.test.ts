import { expect } from "chai";
import  mongoose  from "mongoose";
import  CarModel from '../../../models/carModel'


describe('Database Tests', () => {
  const model =new CarModel();
  mongoose.Promise = global.Promise;

  before(async (done) => {
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.once('open',()=>{});
    db.on('error', console.error.bind(console, 'connection error:'));
    console.log('Connected to MongoDB');
    done()
});
  after( function(done) {
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close()
      done();
    })
  })

describe('Car Model', () => {
  it ('should exist',()=>{
    expect(model).to.exist;
  });

  it ('should create  a car',async()=>{
    const car ={
      "model": "BMW",
      "year": 2018,
      "color": "red",
      "buyValue": 100000,
      "seatsQty": 4,
      "doorsQty": 4,
    }
    const newCar = await model.create(car) as any;
    expect(newCar._id).to.exist;
  });

  it ('should get all cars',async()=>{
    const cars = await model.read();
    expect(cars.length).to.be.greaterThan(0);
  });

  it ('should update a car',async()=>{
    const car ={
      "model": "BMW",
      "year": 2018,
      "color": "red",
      "buyValue": 100000,
      "seatsQty": 4,
      "doorsQty": 4,
    };
    const newCar = await model.create(car) as any;
    const updateOptions ={
      "model": "BMW",
      "year": 2018,
      "color": "black",
      "buyValue": 350000,
      "seatsQty": 4,
      "doorsQty": 4,
    } as never
     const updatedCar = await model.update(newCar._id, updateOptions) as any;
     expect(updatedCar.color).to.be.equal('black');
  });

  it ('should delete a car',async()=>{
    // const car ={
    //   "model": "BMW",
    //   "year": 2018,
    //   "color": "red",
    //   "buyValue": 100000,
    //   "seatsQty": 4,
    //   "doorsQty": 4,
    // };
    // const newCar = await model.create(car) as any;
    // const deletedCar = await model.delete(newCar._id) as any;
    // expect(deletedCar).to.be.equal(null);
    const car = await model.read()as any[]
    await model.delete(car[0]._id) as any;
    const cars = await model.readOne(car[0]._id)as any;
    expect(cars).to.be.null;
    
  })

})
})


