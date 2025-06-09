import { Injectable } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction';
import { CreateTransactionUseCase } from '../../domain/ports/inputs/create-transaction.use-case';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/impl/create-transaction.command';

@Injectable()
export class CreateTransactionUseCaseImpl implements CreateTransactionUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: Transaction): Promise<Transaction> {
    return await this.commandBus.execute(
      new CreateTransactionCommand(
        data.accountDebit,
        data.accountCredit,
        data.value,
        data.transferTypeId,
      ),
    );
  }
}
