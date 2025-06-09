import { Transaction } from '../../entities/transaction';

export interface CreateTransactionUseCase {
  execute(
    data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'statusId'>,
  ): Promise<Transaction>;
}
