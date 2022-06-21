import CarController from './controllers/carController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/CustomRouter';
import App from './app';
import ErrorMiddlware from './middlewares/ErrorMiddlware';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.addmiddleware(ErrorMiddlware);

export default server;
