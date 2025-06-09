import { TransactionProducer } from './../../domain/ports/output/transaction.producer';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EVENT_STORE, EVENTS_TYPES } from 'src/config/contants/events';
import { TransactionValidatedEvent } from '../../domain/ports/output/transaction.producer.interfaces';

export class TransactionProducerImpl implements TransactionProducer {
  constructor(@Inject(EVENT_STORE) private readonly kafka: ClientKafka) {}

  onTransactionValidatedEvent(payload: TransactionValidatedEvent) {
    this.kafka.emit(EVENTS_TYPES.TRANSACTION_VALIDATED, {
      data: payload,
    });
  }
}
