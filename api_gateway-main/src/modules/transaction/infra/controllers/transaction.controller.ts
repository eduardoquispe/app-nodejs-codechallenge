import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTransactionRequestDto } from '../dtos/create-transaction-request.dto';
import { catchError } from 'rxjs';
import { CreateTransactionUseCaseImpl } from '../../application/uses-cases/create-transaction.use-case.impl';
import { GetTransactionUseCaseImpl } from '../../application/uses-cases/get-transaction.use-case.impl';
import { PROVIDERS } from 'src/config/contants';

@Controller('transaction')
export class TransactionController {
  private readonly logger = new Logger();

  constructor(
    @Inject(PROVIDERS.GetTransactionUseCase)
    private readonly getTransactionUseCaseImpl: GetTransactionUseCaseImpl,

    @Inject(PROVIDERS.CreateTransactionUseCase)
    private readonly createTransactionUseCaseImpl: CreateTransactionUseCaseImpl,
  ) {}

  @Get(`detail/:id`)
  getTransaction(@Param('id') id: string) {
    return this.getTransactionUseCaseImpl.execute(id)?.pipe(
      catchError((error) => {
        this.logger.error(error);
        throw new BadRequestException(error);
      }),
    );
  }

  @Post('create')
  createTransaction(@Body() body: CreateTransactionRequestDto) {
    return this.createTransactionUseCaseImpl.execute(body)?.pipe(
      catchError((error) => {
        this.logger.error(error);
        throw new BadRequestException(error);
      }),
    );
  }
}
