import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENT_STORE } from 'src/config/contants/events';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_STORE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [envs.KAFKA_BROKER],
            retry: {
              initialRetryTime: 2000,
              retries: 10,
            },
          },
          consumer: {
            groupId: 'ms-antifraud-group',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
