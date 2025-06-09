import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../impl/create-transaction.command';
import { HttpStatus, Inject, Logger } from '@nestjs/common';
import { PROVIDERS } from 'src/config/contants/contants';
import { TransactionRepository } from 'src/modules/transaction/domain/ports/outputs/repositories/transaction.repository';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  private readonly logger = new Logger(CreateTransactionHandler.name);

  constructor(
    @Inject(PROVIDERS.TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<void> {
    try {
      this.logger.log('createTransaction', command);
      await this.transactionRepository.create({
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
