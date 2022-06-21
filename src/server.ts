import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/CustomRouter';
import App from './app';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.addmiddleware();

export default server;
