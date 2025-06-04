import transactionData from '../mockData/transaction.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TransactionService {
  constructor() {
    this.transactions = [...transactionData];
  }

  async getAll() {
    await delay(300);
    return [...this.transactions].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }

  async getById(id) {
    await delay(250);
    const transaction = this.transactions.find(t => t.id === id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return { ...transaction };
  }

  async create(transactionData) {
    await delay(400);
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString()
    };
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

  async update(id, transactionData) {
    await delay(350);
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    this.transactions[index] = { ...this.transactions[index], ...transactionData };
    return { ...this.transactions[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }
    const deletedTransaction = this.transactions.splice(index, 1)[0];
    return { ...deletedTransaction };
  }
}

export default new TransactionService();