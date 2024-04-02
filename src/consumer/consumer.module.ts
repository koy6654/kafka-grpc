import { Module } from '@nestjs/common';
import { ConsumerProcess } from './consumer.process';
import { ConsumerService } from './consumer.service';

@Module({
    providers: [ConsumerService, ConsumerProcess],
})
export class ConsumerModule {}
