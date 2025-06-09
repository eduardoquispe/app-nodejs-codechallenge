import { ClientKafka } from '@nestjs/microservices';
import { envs } from 'src/config/envs';

export class KafkaClientFactory {
  static createClient(): ClientKafka {
    return new ClientKafka({
      client: {
        clientId: 'api-gateway',
        brokers: [envs.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'ms-gateway-group',
      },
    });
  }
}
