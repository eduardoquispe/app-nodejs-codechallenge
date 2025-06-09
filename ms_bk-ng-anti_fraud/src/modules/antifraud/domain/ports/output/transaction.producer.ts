import { TransactionValidatedEvent } from './transaction.producer.interfaces';

export interface TransactionProducer {
  onTransactionValidatedEvent(transaction: TransactionValidatedEvent): void;
}
