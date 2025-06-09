import { Module } from '@nestjs/common';
import { PROVIDERS } from 'src/config/constants/providers';
import { TransactionRepositoryImpl } from './infra/repositories/transaction.repository.impl';
import { PrismaService } from 'src/config/db/db-client';
import { CreateTransactionUseCaseImpl } from './application/use-cases/create-transaction.use-case.impl';
import { CreateTransactionHandler } from './application/commands/handlers/create-transaction.handler';
import { TransactionProducerImpl } from './infra/producers/transaction.producer.impl';
import { CreatedTransactionEventHandler } from './infra/listeners/created-transacton.event.handler';
import { UpdateTransactionStatusUseCaseImpl } from './application/use-cases/update-transaction-status.use-case.impl';
import { UpdateTransactionStatusHandler } from './application/commands/handlers/update-transaction-status.handler';
import { UpdatedTransactionEventHandler } from './infra/listeners/updated-transaction.event.handler';
import { TransactionController } from './infra/controllers/transaction.controller';
import { KafkaModule } from 'src/modules/transaction/infra/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [TransactionController],
  providers: [
    {
      provide: PROVIDERS.TRANSACTION_REPOSITORY,
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: PROVIDERS.CREATE_TRANSACTION_USE_CASE,
      useClass: CreateTransactionUseCaseImpl,
    },
    {
      provide: PROVIDERS.UPDATE_TRANSACTION_STATUS_USE_CASE,
      useClass: UpdateTransactionStatusUseCaseImpl,
    },
    // Listeners
    CreatedTransactionEventHandler,
    UpdatedTransactionEventHandler,
    // Producers
    {
      provide: PROVIDERS.TRANSACTION_PRODUCER,
      useClass: TransactionProducerImpl,
    },
    CreateTransactionHandler,
    UpdateTransactionStatusHandler,
    PrismaService,
  ],
  exports: [],
})
export class TransactionModule {}
