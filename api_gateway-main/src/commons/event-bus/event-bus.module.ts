import { Module } from '@nestjs/common';
import { KafkaEventBus } from './kafka/kafka-event-bus.adapter';

@Module({
  providers: [
    KafkaEventBus,
    {
      provide: 'EventBusPort',
      useClass: KafkaEventBus,
    },
  ],
  exports: ['EventBusPort'],
})
export class EventBusModule {}
