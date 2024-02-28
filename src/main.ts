import { NestFactory } from '@nestjs/core';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProducerModule } from './producer/producer.module';
import { AppModule } from './app.module';
import { KAFKA_OPTION } from './app.constants';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice(KAFKA_OPTION);
    await app.listen(5000);

    // 오직 Kafka producer, consumer 기능만을 위할 경우
    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, KAFKA_OPTION);
    // await app.listen();
}

bootstrap();
