import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

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
