import { Transaction } from 'src/modules/transaction/domain/entities/transaction';

export class CreatedTransactionEvent {
  constructor(public readonly transaction: Transaction) {}
}
