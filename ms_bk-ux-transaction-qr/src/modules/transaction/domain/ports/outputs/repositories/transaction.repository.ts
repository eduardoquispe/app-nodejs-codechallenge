import { Transaction } from '../../../entities/transaction.entity';

export interface TransactionRepository {
  findByExternalId(externalId: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  create(data: any): Promise<Transaction>;
  update(id: string, data: any): Promise<Transaction>;
}
