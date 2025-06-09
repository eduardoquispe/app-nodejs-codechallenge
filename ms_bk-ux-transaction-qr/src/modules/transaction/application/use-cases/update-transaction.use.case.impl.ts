import { Injectable } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateTransactionCommand } from '../commands/impl/update-transaction.command';

@Injectable()
export class UpdateTransactionUseCaseImpl {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: Transaction): Promise<void> {
    await this.commandBus.execute(
      new UpdateTransactionCommand(
        data.externalId,
        data.typeName,
        data.statusName,
        data.value,
        data.createdAt,
        data.updatedAt,
      ),
    );
  }
}
