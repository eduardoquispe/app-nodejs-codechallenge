import { Observable } from 'rxjs';

export interface EventBusPort {
  publish<T = any, K = any>(eventName: string, payload: T): Observable<K>;
}
