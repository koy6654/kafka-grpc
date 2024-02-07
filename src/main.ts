import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 마이크로서비스 추가
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092', 'localhost:9093'],
        },
        consumer: {
          groupId: 'mung-group-0',
        },
      },
    },
  );

  // 마이크로서비스 실행
  await app.listen();
}

bootstrap();
