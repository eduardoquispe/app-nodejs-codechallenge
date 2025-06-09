import { Observable } from 'rxjs';
import { GetTransactionModelOutput } from '../../models/get-transaction.model.output';

export interface GetTransactionUseCase {
  execute(id: string): Observable<GetTransactionModelOutput>;
}
