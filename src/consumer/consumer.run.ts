import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { KAFKA_TOPIC } from '../common/constants';

@Injectable()
export class ConsumerRun implements OnModuleInit {
    constructor(
        @Inject(ConsumerService)
        private readonly consumerService: ConsumerService,
    ) {}

    async onModuleInit() {
        await this.consumerService.consume({ topics: [KAFKA_TOPIC] });
    }
}
