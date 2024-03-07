import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_MODULE_OPTION } from 'src/app.constants';
import { ConsumerModule } from 'src/consumer/consumer.module';

@Module({
    imports: [ClientsModule.register([CLIENT_MODULE_OPTION])],
    controllers: [ProducerController],
    providers: [ProducerService],
})
export class ProducerModule {}
