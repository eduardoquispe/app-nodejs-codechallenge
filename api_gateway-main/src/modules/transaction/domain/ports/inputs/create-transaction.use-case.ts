import { Observable } from 'rxjs';
import { CreateTransactionModelInput } from '../../models/create-transaction.model.input';
import { GetTransactionModelOutput } from '../../models/get-transaction.model.output';

export interface CreateTransactionUseCase {
  execute(
    input: CreateTransactionModelInput,
  ): Observable<GetTransactionModelOutput>;
}
