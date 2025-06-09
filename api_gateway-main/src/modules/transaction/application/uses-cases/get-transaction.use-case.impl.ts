import { Injectable, Inject } from '@nestjs/common';
import { EventBusPort } from 'src/commons/event-bus/event-bus.port';
import { Observable } from 'rxjs';
import { TRANSACTION_DETAIL_TOPIC } from 'src/config/contants';
import { GetTransactionUseCase } from '../../domain/ports/inputs/get-transaction.use-case';
import { GetTransactionModelOutput } from '../../domain/models/get-transaction.model.output';
import { GetTransactionModelInput } from '../../domain/models/get-transaction.model.input';

@Injectable()
export class GetTransactionUseCaseImpl implements GetTransactionUseCase {
  constructor(
    @Inject('EventBusPort') private readonly eventBus: EventBusPort,
  ) {}

  execute(id: string): Observable<GetTransactionModelOutput> {
    return this.eventBus.publish<
      GetTransactionModelInput,
      GetTransactionModelOutput
    >(TRANSACTION_DETAIL_TOPIC, { externalId: id });
  }
}
