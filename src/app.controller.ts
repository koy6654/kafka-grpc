import { Controller, Inject, Logger, Post, Req, Res } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { ProducerService } from './producer/producer.service';
import { Request, Response } from 'express';
import { KAFKA_PRODUCER_SERVICE, KAFKA_TOPIC } from './common/constants';
import { AppBody } from './types/types';

@Controller()
export class AppController {
    private readonly kafka: Kafka;
    private readonly producer: Producer;
    private readonly logger: Logger;

    constructor(
        @Inject(KAFKA_PRODUCER_SERVICE)
        private readonly producerService: ProducerService,
    ) {}

    @Post('/app')
    async send(@Req() req: Request<any, any, AppBody>, @Res() res: Response) {
        const bodyMessage = req.body.message;

        const topic = KAFKA_TOPIC;
        const message = { value: bodyMessage };
        await this.producerService.sendMessage(topic, message);

        res.json({ data: true });
        return;
    }
}
