import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionUseCase } from './../../domain/ports/inputs/uses-cases/create-transaction.use-case';
import { CreateTransactionCommand } from '../commands/impl/create-transaction.command';
import { Transaction } from '../../domain/entities/transaction.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransactionUseCaseImpl implements CreateTransactionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: Transaction): Promise<void> {
    await this.commandBus.execute(
      new CreateTransactionCommand(
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
