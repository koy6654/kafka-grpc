import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { KAFKA_PRODUCER_CLIENT_ID } from '../../common/constants';
import { sleep } from '../../common/utils';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
    private readonly kafka: Kafka;

    private readonly producer: Producer;

    private readonly logger: Logger;

    constructor() {
        this.kafka = new Kafka({
            clientId: KAFKA_PRODUCER_CLIENT_ID,
            brokers: [process.env.BROKER_1, process.env.BROKER_2, process.env.BROKER_3],
        });

        this.producer = this.kafka.producer();

        this.logger = new Logger();
    }

    public async connect() {
        try {
            await this.producer.connect();
            this.logger.log('Kafka producer connected');
        } catch (err) {
            this.logger.error('Kafka producer connect error');
            this.logger.error(err);

            await sleep(5 * 1000);
            await this.connect();
        }
    }

    public async disconnect() {
        try {
            await this.producer.disconnect();
            this.logger.log('Kafka producer disconnected');
        } catch (err) {
            this.logger.error('Kafka producer disconnect error');
            this.logger.error(err);

            throw new err();
        }
    }

    public async sendMessage(topic: string, message: Message) {
        try {
            await this.producer.send({ topic, messages: [message] });
            this.logger.log(`Kafka producer send success,  topic: ${topic} message: ${message.value}`);
        } catch (err) {
            this.logger.error('Kafka producer send error');
            this.logger.error(err);

            throw new err();
        }
    }

    async onModuleInit() {
        await this.connect();
    }

    async onModuleDestroy() {
        await this.disconnect();
    }
}
