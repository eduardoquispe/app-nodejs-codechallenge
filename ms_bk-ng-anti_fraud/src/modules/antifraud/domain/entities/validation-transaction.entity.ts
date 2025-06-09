import { StatusEntity } from './status-entity';
import { TransferTypeEntity } from './transfer-type.entity';

export class ValidationTransactionEntity {
  id: string;
  value: number;
  transferType: TransferTypeEntity;
  status: StatusEntity;
  createdAt: string;
  updatedAt: string;
}
