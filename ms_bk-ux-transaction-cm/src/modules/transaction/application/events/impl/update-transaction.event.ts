import { Transaction } from 'src/modules/transaction/domain/entities/transaction';

export class UpdateTransactionEvent {
  constructor(public readonly transaction: Transaction) {}
}
