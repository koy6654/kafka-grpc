import { Controller, Inject, Logger, Post, Res } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { sleep } from '../utils';
import { ProducerService } from './producer.service';
import { Response } from 'express';

@Controller('/producer')
export class ProducerController {
    private readonly kafka: Kafka;
    private readonly producer: Producer;
    private readonly logger: Logger;

    constructor(
        @Inject('PRODUCER_SERVICE')
        private readonly producerService: ProducerService,
    ) {}

    @Post('send')
    async send(@Res() res: Response) {
        const topic = process.env.TOPIC;
        const message = { value: 'Hello world with kafka' };
        await this.producerService.send(topic, message);

        res.json({ data: true });
        return;
    }

    async connect() {
        try {
            await this.producer.connect();
        } catch (err) {
            this.logger.error('Failed to connect to Kafka.', err);
            await sleep(5000);
            await this.connect();
        }
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}
