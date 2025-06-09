import { Transaction } from '../../../entities/transaction.entity';

export interface CreateTransactionUseCase {
  execute(data: Transaction): Promise<void>;
}
