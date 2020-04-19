import Transaction from '../model/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';

interface CreateTransactionDTO {
  title: string;
  value: string;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  execute({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = {
      title,
      value,
      type,
    };
    const newTransaction = this.transactionRepository.create(transaction);
    return newTransaction;
  }
}

export default CreateTransactionService;
