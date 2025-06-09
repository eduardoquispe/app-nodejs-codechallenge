import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionStatusCommand } from '../impl/update-transaction-status.command';
import { Inject, Logger } from '@nestjs/common';
import { PROVIDERS } from 'src/config/constants/providers';
import { TransactionRepository } from 'src/modules/transaction/domain/ports/outputs/repositories/transaction.repository';
import { UpdateTransactionEvent } from '../../events/impl/update-transaction.event';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand>
{
  private readonly logger = new Logger(UpdateTransactionStatusCommand.name);

  constructor(
    @Inject(PROVIDERS.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTransactionStatusCommand) {
    this.logger.log({ command });

    const response = await this.transactionRepository.updateTransactionStatus(
      command.transactionId,
      command.statusId,
    );

    this.eventBus.publish(new UpdateTransactionEvent(response));
  }
}
