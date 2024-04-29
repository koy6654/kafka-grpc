import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Consumer, ConsumerSubscribeTopics, Kafka, KafkaMessage } from 'kafkajs';
import { sleep } from '../utils';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka: Kafka;

    private readonly consumer: Consumer;

    private readonly logger: Logger;

    constructor() {
        this.kafka = new Kafka({
            brokers: [process.env.BROKER_1, process.env.BROKER_2, process.env.BROKER_3],
        });

        this.consumer = this.kafka.consumer({ groupId: process.env.CONSUMER_GROUP_ID });

        this.logger = new Logger();
    }

    async onApplicationShutdown() {
        await this.consumer.disconnect();
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
            this.logger.error('Failed to connect to Kafka.', err);
            await sleep(5000);
            await this.connect();
        }
    }

    async processMail(payload: any, conext: KafkaContext): Promise<boolean> {
        // setTimeout(() => 2 * 1000);

        console.log('sendMail start');
        const originalMessage = conext.getMessage();
        console.log(payload);
        console.log(originalMessage);

        return true;
    }
}
