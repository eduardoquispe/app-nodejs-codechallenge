import { Inject, Logger } from '@nestjs/common';
import { TRANSACTION_STATUS } from 'src/config/contants/transaction';
import { TransactionProducer } from '../../domain/ports/output/transaction.producer';
import { ValidationTransactionUseCase } from '../../domain/ports/input/validation-transaction.use-case';
import { PROVIDERS } from 'src/config/contants/providers';

export class ValidationTransactionUseCaseImpl
  implements ValidationTransactionUseCase
{
  private readonly logger = new Logger(ValidationTransactionUseCaseImpl.name);
  private readonly maxValue = 1000;

  constructor(
    @Inject(PROVIDERS.TRANSACTION_PRODUCER)
    private readonly transactionProducer: TransactionProducer,
  ) {}

  execute(transaction: any) {
    this.logger.log('Validating transaction:', transaction);

    const { value } = transaction;

    let status = TRANSACTION_STATUS.APPROVED;

    if (value > this.maxValue || value <= 0) {
      status = TRANSACTION_STATUS.REJECTED;
    }

    this.transactionProducer.onTransactionValidatedEvent({
      id: transaction.id,
      status,
    });
  }
}
