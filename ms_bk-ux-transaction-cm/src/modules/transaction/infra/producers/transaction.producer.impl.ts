import { Inject, Injectable } from '@nestjs/common';
import { TransactionProducer } from '../../domain/ports/outputs/producers/transaction.producer';
import { Transaction } from '../../domain/entities/transaction';
import { EVENTS_TYPES } from 'src/config/constants/topics';
import { ClientKafka } from '@nestjs/microservices';
import { EVENT_STORE } from 'src/config/constants/services';

@Injectable()
export class TransactionProducerImpl implements TransactionProducer {
  constructor(@Inject(EVENT_STORE) private readonly kafka: ClientKafka) {}

  onTransactionCreatedEvent(payload: Transaction) {
    this.kafka.emit(EVENTS_TYPES.TRANSACTION_CREATED, {
      data: payload,
    });
  }

  onTransactionUpdatedEvent(payload: Transaction) {
    this.kafka.emit(EVENTS_TYPES.TRANSACTION_UPDATED, {
      data: payload,
    });
  }
}
