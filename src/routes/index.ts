import { Router } from 'express';
import transactionRouter from './transactions.router';

const routes = Router();

routes.use('/transactions', transactionRouter);

export default routes;
