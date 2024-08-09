import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { KAFKA_PRODUCER_SERVICE } from '../../common/constants';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: KAFKA_PRODUCER_SERVICE,
            useClass: ProducerService,
        },
    ],
    exports: [KAFKA_PRODUCER_SERVICE],
})
export class ProducerModule {}
