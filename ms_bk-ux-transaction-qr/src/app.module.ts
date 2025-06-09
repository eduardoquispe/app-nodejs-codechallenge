import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [CqrsModule.forRoot(), TransactionModule],
})
export class AppModule {}
