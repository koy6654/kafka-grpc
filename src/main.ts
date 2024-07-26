import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { ProcessArgv } from './types/types';
import { ProducerModule } from './producer/producer.module';
import { ConsumerModule } from './consumer/consumer.module';

dotenv.config();

async function bootstrap() {
    const processArgs = process.argv.slice(2) as ProcessArgv[];
    if (processArgs.length >= 2) {
        throw new Error('33d12541-e912-5b0d-ab2c-48ea05c74a28');
    }

    const processArgv = processArgs[0] || 'all';
    switch (processArgv) {
        case 'all':
            const app = await NestFactory.create(AppModule);
            await app.listen(5000);
            break;
        case 'producer':
            await NestFactory.create(ProducerModule);
            break;
        case 'consumer':
            await NestFactory.create(ConsumerModule);
            break;
    }
}

bootstrap();
