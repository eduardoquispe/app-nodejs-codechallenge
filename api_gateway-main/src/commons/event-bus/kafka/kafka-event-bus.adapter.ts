import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBusPort } from '../event-bus.port';
import { KafkaClientFactory } from './kafka-client.factory';
import { Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { SUBSCRIPTED_TOPICS } from 'src/config/contants';

@Injectable()
export class KafkaEventBus implements EventBusPort, OnModuleInit {
  private readonly clientKafka: ClientKafka = KafkaClientFactory.createClient();

  async onModuleInit() {
    const subscriptionPromises = SUBSCRIPTED_TOPICS.map((topic) =>
      this.clientKafka.subscribeToResponseOf(topic),
    );

    await Promise.all(subscriptionPromises);

    await this.clientKafka.connect();
  }

  publish<T, K = any>(eventName: string, payload: T): Observable<K> {
    console.log({ eventName, payload });
    return this.clientKafka.send<K, { data: T }>(eventName, { data: payload });
  }
}
