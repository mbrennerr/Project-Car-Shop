import * as sinon from 'sinon';
import chai, { should } from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarService from '../../../service/carService';
import {Car} from '../../../interfaces/CarInterface';

chai.use(chaiHttp);

const {expect} =chai;

const carObj = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const Mockcar: Car = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
};

describe('Testing Car Controller', () => {
  const service = new CarService();
  server.startServer(3002);
  
  describe('GET /cars', async() => {
    let res:any;

    before(async () => {
      sinon
      .stub(service, 'read')
      .resolves([Mockcar] );
      res = await chai.request(server.app)
      .get('/cars')
      .then((res)=> res);
    })
    after(() => {
      sinon.restore();
    })

    it('Shoud return status code 200', async() => {
      expect(res.status).to.equal(200);
    })
    it('Shoud return an array of cars', async() => {
      expect(res.body).to.be.an('array');
    })
  })

  describe('GET /cars/:id', () => {
    let res:any;
    let created:any;

    before(async () => {
      created = await chai.request(server.app)
      .post('/cars')
      .send(carObj)
      .then((res)=> res);

      sinon.stub(service, 'readOne')
      .resolves(carObj);

      res = await chai.request(server.app)
      .get(`/cars/${created.body._id}`)
      .then((res)=> res);
    })
    after(() => {
      sinon.restore();
    })
    it('Shoud return status code 200 and a car', async() => {
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(Object.keys(res.body)).to.have.lengthOf(7);
    })
    })
  })
  describe('POST /cars', async() => {
    describe('When the request is fails', () => {
      let res:any;
      it('should return 400 if an empty object is sent', async() => {
        res = await chai.request(server.app)
        .post('/cars')
        .send({})
        .then((res)=> res);
        const labelErr ={
          "error": "\"model\" is required",
        }
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if the amount of "seat Qty" is less than 2',async() => {
        const labelErr = {"error": "\"seatsQty\" must be greater than or equal to 2",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({model: "Ferrari Maranello",
        year: 1963,
        color: "red",
        buyValue: 3500000,
        seatsQty: 1,
        doorsQty: 2})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if the amount of "doors Qty" is less than 2',async() => {
        const labelErr = {"error": "\"doorsQty\" must be greater than or equal to 2",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 1})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if model is not present',async() => {
        const labelErr = {"error": "\"model\" is required",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if the amount of "year" is less than 1900',async() => {
        const labelErr = {"error": "\"year\" must be greater than or equal to 1900",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1899,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 1})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if year is not present',async() => {
        const labelErr = {"error": "\"year\" is required",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if color is not present',async() => {
        const labelErr = {"error": "\"color\" is required",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1963,
        "buyValue": 3500000,
        "seatsQty": 2,
        "doorsQty": 2})
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "seatsQty" is not present',async() => {
        const labelErr = {"error": "\"seatsQty\" is required",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "doorsQty":2 })
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "doorsQty" is not present',async() => {
        const labelErr = {"error": "\"doorsQty\" is required",}
        res = await chai.request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty":2 })
        .then((res)=> res);
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })

    })

    describe('When the request is successful', () => {
      let res:any

      it('should return 201 if the request is successful', async() => {
        res = await chai
        .request(server.app)
        .post('/cars')
        .send({"model": "Ferrari Maranello",
        "year": 1963,
        "color": "red",
        "buyValue": 3500000,
        "seatsQty": 4,
        "doorsQty": 4})
        .then((res)=> res);
        expect(res.status).to.be.equal(201);
        expect(Object.keys(res.body)).to.have.lengthOf(7);
      })
    })
  })