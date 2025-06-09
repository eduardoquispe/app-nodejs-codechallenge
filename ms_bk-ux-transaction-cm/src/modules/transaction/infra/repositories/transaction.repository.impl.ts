import { Injectable } from '@nestjs/common';
import { TRANSACTION_STATUS } from 'src/config/constants/transaction';
import { PrismaService } from 'src/config/db/db-client';
import { Transaction } from '../../domain/entities/transaction';
import { TransactionRepository } from '../../domain/ports/outputs/repositories/transaction.repository';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(public readonly prisma: PrismaService) {}

  async create(transaction: Transaction) {
    return this.prisma.transaction.create({
      data: {
        accountDebit: transaction.accountDebit,
        accountCredit: transaction.accountCredit,
        value: transaction.value,
        transferTypeId: transaction.transferTypeId,
        statusId: TRANSACTION_STATUS.PENDING,
      },
      include: {
        transferType: true,
        status: true,
      },
    });
  }

  async updateTransactionStatus(transactionId: string, status: number) {
    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        statusId: status,
      },
      include: {
        status: true,
        transferType: true,
      },
    });
  }
}
