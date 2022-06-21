import express, { Router } from 'express';
import connectToDatabase from './connection';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
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

  public addmiddleware(middleware: any) {
    this.app.use(middleware);
  }

  public getApp() {
    return this.app;
  }
}
