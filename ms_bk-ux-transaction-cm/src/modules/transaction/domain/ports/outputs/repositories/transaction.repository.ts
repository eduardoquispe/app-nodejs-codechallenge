import { Transaction } from '../../../entities/transaction';

export interface TransactionRepository {
  create(
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Transaction>;
  updateTransactionStatus(
    transactionId: string,
    status: number,
  ): Promise<Transaction>;
}
