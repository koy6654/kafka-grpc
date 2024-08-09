import { Controller, Inject } from '@nestjs/common';
import { ProducerService } from './modules/producer/producer.service';
import { KAFKA_PRODUCER_SERVICE, KAFKA_TOPIC } from './common/constants';
import { GrpcMethod } from '@nestjs/microservices';
import { SendMessageRequestDto, SendMessageResponseDto, SendMessageResponseStatus } from './models/types/app';

@Controller()
export class AppController {
    constructor(
        @Inject(KAFKA_PRODUCER_SERVICE)
        private readonly producerService: ProducerService,
    ) {}

    @GrpcMethod('AppService', 'SendMessage')
    async sendMessage(sendMessageDto: SendMessageRequestDto): Promise<SendMessageResponseDto> {
        try {
            const topic = KAFKA_TOPIC;
            const message = { value: sendMessageDto.message };

            await this.producerService.sendMessage(topic, message);

            return { status: SendMessageResponseStatus.SUCCESS };
        } catch (err) {
            return { status: SendMessageResponseStatus.FAILED };
        }
    }
}
