import { Injectable, Inject } from '@nestjs/common';
import { EventBusPort } from 'src/commons/event-bus/event-bus.port';
import { Observable } from 'rxjs';
import { TRANSACTION_CREATE_TOPIC } from 'src/config/contants';
import { CreateTransactionUseCase } from '../../domain/ports/inputs/create-transaction.use-case';
import { CreateTransactionModelInput } from '../../domain/models/create-transaction.model.input';
import { GetTransactionModelOutput } from '../../domain/models/get-transaction.model.output';

@Injectable()
export class CreateTransactionUseCaseImpl implements CreateTransactionUseCase {
  constructor(
    @Inject('EventBusPort') private readonly eventBus: EventBusPort,
  ) {}

  execute(
    input: CreateTransactionModelInput,
  ): Observable<GetTransactionModelOutput> {
    return this.eventBus.publish<
      CreateTransactionModelInput,
      GetTransactionModelOutput
    >(TRANSACTION_CREATE_TOPIC, input);
  }
}
