import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { TOPICS } from 'src/config/constants/topics';
import { CreateTransactionRequestDto } from 'src/modules/transaction/infra/dtos/create-transaction-request.dto';
import { UpdateTransactionStatusRequestDto } from 'src/modules/transaction/infra/dtos/update-transaction-status-request.dto';
import { CreateTransactionUseCase } from '../../domain/ports/inputs/create-transaction.use-case';
import { PROVIDERS } from 'src/config/constants/providers';
import { UpdateTransactionStatusUseCase } from '../../domain/ports/inputs/update-transaction-status.use-case';

@Controller()
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(
    @Inject(PROVIDERS.CREATE_TRANSACTION_USE_CASE)
    private readonly createTransactionUseCase: CreateTransactionUseCase,

    @Inject(PROVIDERS.UPDATE_TRANSACTION_STATUS_USE_CASE)
    private readonly updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
  ) {}

  @MessagePattern(TOPICS.TRANSACTION_CREATED)
  async createTransaction(@Payload('data') data: CreateTransactionRequestDto) {
    this.logger.log('createTransaction', data);
    const response = await this.createTransactionUseCase.execute({
      accountDebit: data.accountExternalIdDebit,
      accountCredit: data.accountExternalIdCredit,
      value: data.value,
      transferTypeId: data.transferTypeId,
    });
    this.logger.log({ response });

    return response;
  }

  @EventPattern(TOPICS.TRANSACTION_VALIDATED)
  async onTransactionValidated(
    @Payload('data') data: UpdateTransactionStatusRequestDto,
  ) {
    this.logger.log('onTransactionValidated', data);
    const { id, status } = data;

    await this.updateTransactionStatusUseCase.execute(id, status);
  }
}
