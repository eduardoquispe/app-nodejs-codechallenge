import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionCommand } from '../impl/update-transaction.command';
import { TransactionRepository } from 'src/modules/transaction/domain/ports/outputs/repositories/transaction.repository';
import { HttpStatus, Inject, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PROVIDERS } from 'src/config/contants/contants';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand>
{
  private readonly logger = new Logger(UpdateTransactionHandler.name);

  constructor(
    @Inject(PROVIDERS.TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(command: UpdateTransactionCommand): Promise<void> {
    try {
      this.logger.log('updateTransaction', command);
      await this.transactionRepository.update(command.externalId, {
        externalId: command.externalId,
        typeName: command.typeName,
        statusName: command.statusName,
        value: command.value,
        createdAt: command.createdAt,
        updatedAt: command.updatedAt,
      });
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        statusCode:
          error?.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.error?.message ?? 'Unexpected error',
      });
    }
  }
}
