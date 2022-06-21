import express, { Router } from 'express';
import connectToDatabase from './connection';
import ErrorMiddlware from './middlewares/ErrorMiddlware';

export default class App {
  public app: express.Application;

  private middleware; 

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.middleware = ErrorMiddlware;
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  // public addmiddleware(middlewares) {
  //   this.app.use(middlewares);
  // }
  // como tipar o middleare de error pra ficar dinamico;

  public addmiddleware() {
    this.app.use(this.middleware);
  }

  public getApp() {
    return this.app;
  }
}
