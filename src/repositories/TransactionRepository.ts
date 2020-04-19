import Transaction from '../model/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionCreateDTO {
  title: string;
  value: string;
  type: 'income' | 'outcome';
}

class TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all() {
    const transactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income += parseFloat(transaction.value);
        balance.total += parseFloat(transaction.value);
      } else {
        balance.outcome += parseFloat(transaction.value);
        balance.total -= parseFloat(transaction.value);
      }
    });
    return balance;
  }

  public create({ title, value, type }: TransactionCreateDTO): Transaction {
    const transaction = {
      title,
      value,
      type,
    };

    const newTransaction = new Transaction(transaction);
    const { total } = this.getBalance();
    if (type === 'outcome' && total < parseFloat(value)) {
      throw Error('Your balance is insufficient for this operation');
    }

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionRepository;
