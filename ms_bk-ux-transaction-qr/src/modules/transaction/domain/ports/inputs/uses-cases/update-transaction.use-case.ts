import { Transaction } from '../../../entities/transaction.entity';

export interface UpdateTransactionUseCase {
  execute(data: Transaction): Promise<void>;
}
