import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_OPTION: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'koy-brokers-0',
            brokers: ['localhost:10000', 'localhost:10001', 'localhost:10002'],
        },
        consumer: {
            groupId: 'koy-consumer-group-0',
        },
    },
};

export const CLIENT_MODULE_OPTION = { ...KAFKA_OPTION, name: 'KAFKA' };
