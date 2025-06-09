import { Module } from '@nestjs/common';
import { AppController } from './infra/controllers/app.controller';
import { PROVIDERS } from 'src/config/contants/contants';
import { GetTransactionUseCaseImpl } from './application/use-cases/get-transaction.use-case.impl';
import { TransactionRepositoryImpl } from './infra/repositories/transaction.repository.impl';
import { PrismaService } from 'src/config/db/db-client';
import { GetTransactionHandler } from './application/queries/handlers/get-transaction.handler';
import { CreateTransactionUseCaseImpl } from './application/use-cases/create-transacton.use-case.impl';
import { UpdateTransactionUseCaseImpl } from './application/use-cases/update-transaction.use.case.impl';
import { UpdateTransactionHandler } from './application/commands/handlers/update-transaction.handler';
import { CreateTransactionHandler } from './application/commands/handlers/create-transaction.handler';
import { KafkaModule } from './infra/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [
    {
      provide: PROVIDERS.TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: PROVIDERS.GetTransactionUseCase,
      useClass: GetTransactionUseCaseImpl,
    },
    {
      provide: PROVIDERS.CreateTransactionUseCase,
      useClass: CreateTransactionUseCaseImpl,
    },
    {
      provide: PROVIDERS.UpdateTransactionUseCase,
      useClass: UpdateTransactionUseCaseImpl,
    },
    GetTransactionHandler,
    CreateTransactionHandler,
    UpdateTransactionHandler,
    PrismaService,
  ],
})
export class TransactionModule {}
