import { Module } from '@nestjs/common';
import { ConsumerRun } from './consumer.run';
import { ConsumerService } from './consumer.service';

@Module({
    providers: [ConsumerService, ConsumerRun],
})
export class ConsumerModule {}
