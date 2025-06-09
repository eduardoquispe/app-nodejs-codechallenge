import { GetTransactionQuery } from '../impl/get-transaction.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus, Inject } from '@nestjs/common';
import { TransactionRepository } from 'src/modules/transaction/domain/ports/outputs/repositories/transaction.repository';
import { PROVIDERS } from 'src/config/contants/contants';
import { Transaction } from 'src/modules/transaction/domain/entities/transaction.entity';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(
    @Inject(PROVIDERS.TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(query: GetTransactionQuery): Promise<Transaction> {
    try {
      const { externalId } = query;

      const transaction =
        await this.transactionRepository.findByExternalId(externalId);

      if (!transaction) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Transaction not found',
        });
      }

      return transaction;
    } catch (error) {
      throw new RpcException({
        statusCode:
          error?.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.error?.message ?? 'Transaction not found',
      });
    }
  }
}
