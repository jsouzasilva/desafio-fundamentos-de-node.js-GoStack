import Transaction from '../model/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionCreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;

          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionCreateDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid!');
    }

    const transaction = {
      title,
      value,
      type,
    };

    const newTransaction = new Transaction(transaction);
    const { total } = this.getBalance();
    if (type === 'outcome' && total < value) {
      throw Error('Your balance is insufficient for this operation');
    }

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionRepository;
