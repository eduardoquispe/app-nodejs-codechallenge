import { ValidationTransactionEntity } from '../../entities/validation-transaction.entity';

export interface ValidationTransactionUseCase {
  execute(transaction: ValidationTransactionEntity): void;
}
