import { Transaction } from '../../../entities/transaction.entity';

export interface GetTransactionUseCase {
  execute(externalId: string): Promise<Transaction>;
}
