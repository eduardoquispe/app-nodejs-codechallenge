import { Transaction } from '../../../entities/transaction';

export interface TransactionProducer {
  onTransactionCreatedEvent(payload: Transaction);
  onTransactionUpdatedEvent(payload: Transaction);
}
