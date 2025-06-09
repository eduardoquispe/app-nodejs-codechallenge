// src/shared/kafka/kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../../../../config/envs';
import { TRANSPORT_GROUP_ID } from 'src/config/contants/topics';
import { EVENT_STORE } from 'src/config/contants/contants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_STORE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [envs.KAFKA_BROKER],
          },
          consumer: {
            groupId: TRANSPORT_GROUP_ID,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
