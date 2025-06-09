import { Injectable, Logger } from '@nestjs/common';
import { UpdateTransactionStatusUseCase } from '../../domain/ports/inputs/update-transaction-status.use-case';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTransactionStatusCommand } from '../commands/impl/update-transaction-status.command';

@Injectable()
export class UpdateTransactionStatusUseCaseImpl
  implements UpdateTransactionStatusUseCase
{
  private readonly logger = new Logger(UpdateTransactionStatusUseCaseImpl.name);

  constructor(private readonly commandBus: CommandBus) {}

  async execute(id: string, status: number) {
    this.logger.log({ id, status });
    await this.commandBus.execute(
      new UpdateTransactionStatusCommand(id, status),
    );
  }
}
