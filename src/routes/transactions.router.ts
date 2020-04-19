import { Router } from 'express';
import TransactionRepository from '../repositories/TransactionRepository';
import CreateTransactionService from '../services/CreateTransactionServer';

const transactionRouter = Router();

const transactionRepository = new TransactionRepository();
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.all();
    response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction = {
      title,
      value,
      type,
    };
    const createTransactionService = new CreateTransactionService(
      transactionRepository,
    );
    const newTransaction = createTransactionService.execute(transaction);

    return response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
