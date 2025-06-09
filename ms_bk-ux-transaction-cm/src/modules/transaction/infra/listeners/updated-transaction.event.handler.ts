import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateTransactionEvent } from '../../application/events/impl/update-transaction.event';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from 'src/config/constants/providers';
import { TransactionProducer } from '../../domain/ports/outputs/producers/transaction.producer';

@EventsHandler(UpdateTransactionEvent)
export class UpdatedTransactionEventHandler
  implements IEventHandler<UpdateTransactionEvent>
{
  constructor(
    @Inject(PROVIDERS.TRANSACTION_PRODUCER)
    private readonly producer: TransactionProducer,
  ) {}

  handle(event: UpdateTransactionEvent) {
    this.producer.onTransactionUpdatedEvent(event.transaction);
  }
}
