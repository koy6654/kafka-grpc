import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class ConsumerRun implements OnModuleInit {
    constructor(
        @Inject(ConsumerService)
        private readonly consumerService: ConsumerService,
    ) {}

    async onModuleInit() {
        await this.consumerService.consume({ topics: [process.env.TOPIC] });
    }
}
