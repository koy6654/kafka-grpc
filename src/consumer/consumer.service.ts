import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Consumer, ConsumerSubscribeTopics, Kafka } from 'kafkajs';
import { sleep } from '../common/utils';
import { KAFKA_CONSUMER_CLIENT_ID, KAFKA_CONSUMER_GROUP, KAFKA_TOPIC } from '../common/constants';

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
        await this.consumer.subscribe(topics);
        await this.consumer.run({
            eachMessage: async ({ message, partition }) => {
                try {
                    await sleep(2 * 1000); // Process some task

                    this.logger.debug(
                        `Kafka consumer task success,  partition: ${partition} message: ${message.value}`,
                    );
                } catch (err) {
                    this.logger.error('Kafka consumer task err');
                    this.logger.error(err);
                    throw new err();
                }
            },
        });
    }

    async connect() {
        try {
            await this.consumer.connect();
            this.logger.log('Kafka consumer connected');
        } catch (err) {
            this.logger.error('Kafka consumer connect error');
            this.logger.error(err);

            await sleep(5000);
            await this.connect();
        }
    }

    async disconnect() {
        try {
            await this.consumer.disconnect();
            this.logger.log('Kafka consumer disconnected');
        } catch (err) {
            this.logger.error('Kafka consumer disconnect error');
            this.logger.error(err);

            throw new err();
        }
    }

    async onModuleInit() {
        await this.connect();
        await this.consume({ topics: [KAFKA_TOPIC] });
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }
}
