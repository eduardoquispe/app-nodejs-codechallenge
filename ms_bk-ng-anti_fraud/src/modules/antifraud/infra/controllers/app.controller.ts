import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ValidationTransactionUseCase } from '../../domain/ports/input/validation-transaction.use-case';
import { TransactionValidateRequestDto } from '../dtos/transaction-validate-request.dto';
import { PROVIDERS } from 'src/config/contants/providers';
import { EVENTS_TYPES } from 'src/config/contants/events';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject(PROVIDERS.VALIDATION_TRANSACTION_USE_CASE)
    private readonly validationTransactionUseCase: ValidationTransactionUseCase,
  ) {}

  @EventPattern(EVENTS_TYPES.TRANSACTION_CREATED)
  handleTransactionCreated(
    @Payload('data') data: TransactionValidateRequestDto,
  ) {
    this.logger.log('Transaction Created', data);
    this.validationTransactionUseCase.execute(data);
  }
}
