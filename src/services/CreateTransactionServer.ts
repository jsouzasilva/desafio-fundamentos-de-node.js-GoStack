import Transaction from '../model/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  execute({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
