import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
    private readonly kafka: Kafka;

    private readonly producer: Producer;

    private readonly logger: Logger;

    constructor() {
        this.kafka = new Kafka({
            brokers: [process.env.BROKER_1, process.env.BROKER_2, process.env.BROKER_3],
        });

        this.producer = this.kafka.producer();

        this.logger = new Logger();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

    public async connect() {
        try {
            await this.producer.connect();
            this.logger.log('Producer connect');
        } catch (err) {
            this.logger.error('Producer connect err');
            this.logger.error(err);
        }
    }

    public async send(topic: string, message: Message) {
        try {
            await this.connect();
            await this.producer.send({ topic, messages: [message] });
            this.logger.log('Producer send');
        } catch (err) {
            this.logger.error('Producer send error');
            this.logger.error(err);
        }
    }

    public async disconnect() {
        try {
            await this.producer.disconnect();
            this.logger.log('Producer disconnect');
        } catch (err) {
            this.logger.error('Producer disconnect error');
            this.logger.error(err);
        }
    }
}
