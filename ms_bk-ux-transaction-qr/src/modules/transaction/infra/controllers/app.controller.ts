import { Controller, HttpStatus, Inject, Logger } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { TOPICS, TRANSACTION_EVENTS } from 'src/config/contants/topics';
import { TransactionCreatedRequestDto } from 'src/modules/transaction/infra/dtos/transaction-created-request.dto';
import { TransactionDetailRequestDto } from 'src/modules/transaction/infra/dtos/transaction-detail-request.dto';
import { PROVIDERS } from 'src/config/contants/contants';
import { GetTransactionUseCase } from '../../domain/ports/inputs/uses-cases/get-transaction.use-case';
import { TransactionDetailResponseDto } from '../dtos/transaction-detail-response.dto';
import { CreateTransactionUseCase } from '../../domain/ports/inputs/uses-cases/create-transaction.use-case';
import { UpdateTransactionUseCase } from '../../domain/ports/inputs/uses-cases/update-transaction.use-case';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject(PROVIDERS.GetTransactionUseCase)
    private readonly getTransactionUseCase: GetTransactionUseCase,

    @Inject(PROVIDERS.CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,

    @Inject(PROVIDERS.UpdateTransactionUseCase)
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @MessagePattern(TOPICS.TRANSACTION_DETAIL)
  async getTransaction(
    @Payload('data') data: TransactionDetailRequestDto,
  ): Promise<TransactionDetailResponseDto> {
    try {
      const response = await this.getTransactionUseCase.execute(
        data.externalId,
      );

      return {
        transactionExternalId: response.externalId,
        transactionType: { name: response.typeName },
        transactionStatus: { name: response.statusName },
        value: response.value,
        createdAt: response.createdAt,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        statusCode: error?.error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.error.message ?? 'An unexpected error occurred',
      });
    }
  }

  @EventPattern(TRANSACTION_EVENTS.CREATED)
  async handleCreated(@Payload('data') data: TransactionCreatedRequestDto) {
    this.logger.log('Transaction created', data);
    try {
      await this.createTransactionUseCase.execute({
        externalId: data.id,
        typeName: data.transferType.name,
        statusName: data.status.name,
        value: data.value,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        statusCode:
          error?.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.error?.message ?? 'An unexpected error occurred',
      });
    }
  }

  @EventPattern(TRANSACTION_EVENTS.UPDATED)
  async handleUpdated(@Payload('data') data: TransactionCreatedRequestDto) {
    this.logger.log('Transaction updated', data);
    try {
      await this.updateTransactionUseCase.execute({
        externalId: data.id,
        typeName: data.transferType.name,
        statusName: data.status.name,
        value: data.value,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        statusCode:
          error?.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.error?.message ?? 'An unexpected error occurred',
      });
    }
  }
}
