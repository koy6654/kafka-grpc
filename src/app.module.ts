import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { KAFKA_CLIENT_NAME, KAFKA_CONSUMER_GROUP } from './common/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        ProducerModule,
        ConsumerModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
