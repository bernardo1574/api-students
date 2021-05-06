import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRouter from './routes/homeRoutes';
import studentRouter from './routes/studentRoutes';
import userRouter from './routes/userRoutes';
import tokenRouter from './routes/tokenRoutes';
import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRouter);
    this.app.use('/users', userRouter);
    this.app.use('/tokens', tokenRouter);
    this.app.use('/students', studentRouter);
  }
}
export default new App().app;
