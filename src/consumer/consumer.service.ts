import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Consumer, ConsumerSubscribeTopics, Kafka } from 'kafkajs';
import { sleep } from '../common/utils';
import { KAFKA_CONSUMER_CLIENT_ID, KAFKA_CONSUMER_GROUP } from '../common/constants';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly kafka: Kafka;

    private readonly consumer: Consumer;

    private readonly logger: Logger;

    constructor() {
        this.kafka = new Kafka({
            clientId: KAFKA_CONSUMER_CLIENT_ID,
            brokers: [process.env.BROKER_1, process.env.BROKER_2, process.env.BROKER_3],
        });

        this.consumer = this.kafka.consumer({ groupId: KAFKA_CONSUMER_GROUP });

        this.logger = new Logger();
    }

    async consume(topics: ConsumerSubscribeTopics) {
        await this.consumer.connect();
        await this.consumer.subscribe(topics);
        await this.consumer.run({
            eachMessage: async ({ message, partition }) => {
                this.logger.debug(`================= Processing message =================`);
                this.logger.debug(message.value.toString());
                this.logger.debug(`================= Processing partition =================`);
                this.logger.debug(partition);
            },
        });
    }

    async connect() {
        try {
            await this.consumer.connect();
        } catch (err) {
            this.logger.error('Kafka consumer connected');
            this.logger.error(err);

            await sleep(5000);
            await this.connect();
        }
    }

    async processMessage(payload: any, conext: KafkaContext): Promise<boolean> {
        // setTimeout(() => 2 * 1000);

        console.log('sendMail start');
        const originalMessage = conext.getMessage();
        console.log(payload);
        console.log(originalMessage);

        return true;
    }

    async onModuleInit() {
        return await this.connect();
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }
}
