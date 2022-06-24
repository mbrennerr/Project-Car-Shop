import CarController from './controllers/carController';
import MotoController from './controllers/motoController';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import CustomRouter from './routes/CustomRouter';
import App from './app';

const server = new App();

const carController = new CarController();
const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motoController = new MotoController();
const motoRouter = new CustomRouter<Motorcycle>();
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

server.addmiddleware();

export default server;
