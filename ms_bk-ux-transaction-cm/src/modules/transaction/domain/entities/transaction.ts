import { TransactionStatus } from './transaction-status';
import { TransactionType } from './transaction-type';

export class Transaction {
  id: string;
  accountDebit: string;
  accountCredit: string;
  transferTypeId: number;
  statusId: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;

  transferType?: TransactionType;
  status?: TransactionStatus;
}
