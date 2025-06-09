import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SeedService } from './shared/services/seed.service';

import { TransactionModule } from './modules/transaction/transaction.module';
import { PrismaService } from './config/db/db-client';

@Module({
  imports: [CqrsModule.forRoot(), TransactionModule],
  providers: [SeedService, PrismaService],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.onModuleInit();
  }
}
