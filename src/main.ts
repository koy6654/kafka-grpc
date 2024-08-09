import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import path from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
    const microserviceOptions: GrpcOptions = {
        transport: Transport.GRPC,
        options: {
            package: ['kafka'],
            protoPath: [path.join(__dirname, 'models/proto/app.proto')],
            url: process.env.GRPC_URL,
            loader: { keepCase: true },
        },
    };

    const microservices = await NestFactory.createMicroservice<GrpcOptions>(AppModule, microserviceOptions);
    await microservices.listen();
}

bootstrap();
