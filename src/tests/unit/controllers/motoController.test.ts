import * as sinon from 'sinon';
import chai from 'chai' ;
import chaiHttp from 'chai-http';
import server from '../../../server';
import MotoService from '../../../services/motoService';
import { Motorcycle as IMoto } from '../../../interfaces/MotorcycleInterface';
import { describe } from 'mocha';

chai.use(chaiHttp);
const { expect } = chai;

const mockMoto = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

describe ('Testing Motorcycle Controllers',() =>{
  const service = new MotoService();
  server.startServer(3005);

  //Testando o GET método read rota /motorcycles
  describe ('GET/motorcycles', async() => {
    let res:any;
    before(async () => {
      sinon
      .stub(service, 'read')
      .resolves([{
        model: "Honda CG Titan 125",
        year: 1963,
        color: "red",
        buyValue: 3500,
        category: "Street",
        engineCapacity: 125
      }])
      res = await chai
      .request(server.app)
      .get('/motorcycles')
      .then((res) => res);
    })
    after(() => {
      sinon.restore();
    })
    it('should return status code 200', async () => {
      expect(res.status).to.equal(200);
    })
    it('should return an array of motorcycles', async () => {
      expect(res.body).to.be.an('array');
    })
  });
  describe('GET/motorcycles/:id', () => {
    let res:any;
    let created:any;

    before(async () => {
      created = await chai
      .request(server.app)
      .post('/motorcycles')
      .send({
        model: "Honda CG Titan 125",
            year: 1963,
            color: "red",
            buyValue: 3500,
            category: "Street",
            engineCapacity: 125
      })
      .then((res) => res);

      sinon
      .stub(service, 'readOne')
      .resolves({
        model: "Honda CG Titan 125",
        year: 1963,
        color: "red",
        buyValue: 3500,
        category: "Street",
        engineCapacity: 125
      })
      res = await chai
      .request(server.app)
      .get(`/motorcycles/${created.body._id}`)
      .then((res) => res);
    })
    after(() => {
      sinon.restore();
    })
      it('should return status code 200 and a Motorcycle', async () => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.have.lengthOf(7);
      })
  })

  describe('POST/motorcycles', () => {
    describe('When object criation fails', () => {
      let res:any;
      const labelErr ={
        "error": "\"model\" is required",
      }

      it('should return status code 400 if an empty object is sent ', async () => {
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })

      it('should return 400 if "engineCapacity" is less than 1', async () => {
        const labelErr={
          "error": "\"engineCapacity\" must be greater than or equal to 1",
        }
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          category: "Street",
          engineCapacity: 0
        })
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "engineCapacity" is greater than 2500', async () => {
        const labelErr={
          "error": "\"engineCapacity\" must be less than or equal to 2500",
        }
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          category: "Street",
          engineCapacity: 3000
        })
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "engineCapacity" is not a number', async () => {
        const labelErr={
          "error": "\"engineCapacity\" must be a number"
        }
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          category: "Street",
          engineCapacity: "nam"
        })
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      //Quando a "category" não é informada;
      it('should return 400 if "category" is not sent', async () => {
        const labelErr ={
          "error": "\"category\" is required",
        }
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          engineCapacity: 125
        })
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      //Quando a engineCapacity é menor que 1;
      
      //quando o "modelo" não é informado;
      it('should return 400 if "model" is not sent', async () => {
        const labelErr = {"error": "\"model\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
        year: 1963,
        color: "red",
        buyValue: 3500,
        category: "Street",
        engineCapacity: 125})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      //quando a "categoria" não é informada;
      it('should return 400 if "category" is not sent', async () => {
        const labelErr = {"error": "\"category\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          engineCapacity: 125})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);

      })
      it('should return 400 if "color" is not sent', async () => {
        const labelErr = {"error": "\"color\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          buyValue: 3500,
          category: "Street",
          engineCapacity: 125})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "buyValue" is not sent', async () => {
        const labelErr = {"error": "\"buyValue\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          category: "Street",
          engineCapacity: 125})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "engineCapacity" is not sent', async () => {
        const labelErr = {"error": "\"engineCapacity\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          category: "Street",
          buyValue: 3500})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return 400 if "year" is not sent', async () => {
        const labelErr = {"error": "\"year\" is required",}
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          color: "red",
          buyValue: 3500,
          category: "Street",
          engineCapacity: 125})
        .then((res) => res);
        expect(res.status).to.equal(400);
        expect(res.body).to.be.deep.equal(labelErr);
        expect(Object.keys(res.body)).to.have.lengthOf(1);
      })
      it('should return status code 201 and a Motorcycle', async () => {
        res = await chai
        .request(server.app)
        .post('/motorcycles')
        .send({
          model: "Honda CG Titan 125",
          year: 1963,
          color: "red",
          buyValue: 3500,
          category: "Street",
          engineCapacity: 125
        })
        .then((res) => res);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.have.lengthOf(7);
      })
    })
    
    // TODO:suite de testes das funções de atualização;
    // describe('PUT /motorcycles', () => {
    // let res:any;
      
    // })
  })
})
