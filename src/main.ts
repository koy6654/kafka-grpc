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
          clientId: 'koy-brokers-0',
          brokers: ['localhost:10000', 'localhost:10001', 'localhost:10002'],
        },
        consumer: {
          groupId: 'koy-consumer-group-0',
        },
      },
    },
  );

  // 마이크로서비스 실행
  await app.listen();
}

bootstrap();
