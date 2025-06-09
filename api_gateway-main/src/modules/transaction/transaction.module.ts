import { CreateTransactionUseCaseImpl } from './application/uses-cases/create-transaction.use-case.impl';
import { Module } from '@nestjs/common';
import { TransactionController } from './infra/controllers/transaction.controller';
import { EventBusModule } from 'src/commons/event-bus/event-bus.module';
import { GetTransactionUseCaseImpl } from './application/uses-cases/get-transaction.use-case.impl';
import { PROVIDERS } from 'src/config/contants';

@Module({
  controllers: [TransactionController],
  imports: [EventBusModule],
  providers: [
    {
      provide: PROVIDERS.CreateTransactionUseCase,
      useClass: CreateTransactionUseCaseImpl,
    },
    {
      provide: PROVIDERS.GetTransactionUseCase,
      useClass: GetTransactionUseCaseImpl,
    },
  ],
})
export class TransactionModule {}
