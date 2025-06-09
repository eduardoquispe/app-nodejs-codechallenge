import { QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { GetTransactionUseCase } from '../../domain/ports/inputs/uses-cases/get-transaction.use-case';
import { GetTransactionQuery } from '../queries/impl/get-transaction.query';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class GetTransactionUseCaseImpl implements GetTransactionUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(externalId: string): Promise<Transaction> {
    const response = await this.queryBus.execute(
      new GetTransactionQuery(externalId),
    );

    return response;
  }
}
