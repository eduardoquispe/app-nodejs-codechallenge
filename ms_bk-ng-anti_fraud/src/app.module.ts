import { Module } from '@nestjs/common';
import { AntiFraudModule } from './modules/antifraud/anti-fraud.module';

@Module({
  imports: [AntiFraudModule],
})
export class AppModule {}
