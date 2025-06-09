// src/shared/kafka/kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../../../../config/envs';
import { EVENT_STORE } from '../../../../config/constants/services';
import {
  EVENT_STORE_CLIENT_ID,
  EVENT_STORE_GROUP_ID,
} from '../../../../config/constants/event-store';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_STORE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: EVENT_STORE_CLIENT_ID,
            brokers: [envs.KAFKA_BROKER],
          },
          consumer: {
            groupId: EVENT_STORE_GROUP_ID,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
