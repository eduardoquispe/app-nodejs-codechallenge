import { Module } from '@nestjs/common';
import { AppController } from './infra/controllers/app.controller';
import { KafkaModule } from './infra/kafka/kafka.module';
import { TransactionProducerImpl } from './infra/producers/transaction.producer.impl';
import { ValidationTransactionUseCaseImpl } from './application/uses-cases/validation-transaction.use-case.impl';
import { PROVIDERS } from 'src/config/contants/providers';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [
    {
      provide: PROVIDERS.TRANSACTION_PRODUCER,
      useClass: TransactionProducerImpl,
    },
    {
      provide: PROVIDERS.VALIDATION_TRANSACTION_USE_CASE,
      useClass: ValidationTransactionUseCaseImpl,
    },
  ],
})
export class AntiFraudModule {}
