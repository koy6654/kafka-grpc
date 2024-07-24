import { Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { ProducerService } from './producer/producer.service';
import { Response } from 'express';
import { KAFKA_PRODUCER_SERVICE, KAFKA_TOPIC } from './common/constants';

@Controller('/producer')
export class AppController {
    private readonly kafka: Kafka;
    private readonly producer: Producer;
    private readonly logger: Logger;

    constructor(
        @Inject(KAFKA_PRODUCER_SERVICE)
        private readonly producerService: ProducerService,
    ) {}

    @Post('send')
    async send(@Res() res: Response) {
        const topic = KAFKA_TOPIC;
        const message = { value: 'Hello world with kafka' };
        await this.producerService.sendMessage(topic, message);

        res.json({ data: true });
        return;
    }
}
