import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { PROVIDERS } from 'src/config/constants/providers';
import { CreateTransactionCommand } from '../impl/create-transaction.command';
import { TRANSACTION_STATUS } from 'src/config/constants/transaction';
import { CreatedTransactionEvent } from '../../events/impl/created-transaction.event';
import { TransactionRepository } from 'src/modules/transaction/domain/ports/outputs/repositories/transaction.repository';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    @Inject(PROVIDERS.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,

    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTransactionCommand) {
    const response = await this.transactionRepository.create({
      accountDebit: command.accountExternalIdCredit,
      accountCredit: command.accountExternalIdDebit,
      transferTypeId: command.transferTypeId,
      statusId: TRANSACTION_STATUS.PENDING,
      value: command.value,
    });

    this.eventBus.publish(new CreatedTransactionEvent(response));

    return response;
  }
}
