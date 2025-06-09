import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedTransactionEvent } from '../../application/events/impl/created-transaction.event';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from 'src/config/constants/providers';
import { TransactionProducer } from '../../domain/ports/outputs/producers/transaction.producer';

@EventsHandler(CreatedTransactionEvent)
export class CreatedTransactionEventHandler
  implements IEventHandler<CreatedTransactionEvent>
{
  constructor(
    @Inject(PROVIDERS.TRANSACTION_PRODUCER)
    private readonly producer: TransactionProducer,
  ) {}

  handle(event: CreatedTransactionEvent) {
    this.producer.onTransactionCreatedEvent(event.transaction);
  }
}
