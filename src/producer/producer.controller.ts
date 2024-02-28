import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ProducerSendMailDto } from './producer.dto';
import { ProducerService } from './producer.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('producer')
export class ProducerController {
    constructor(
        private readonly producerService: ProducerService,
        @Inject('KAFKA') private readonly clientKafka: ClientKafka,
    ) {}

    @Post('/send-mail')
    producerSendMail(@Body() body: ProducerSendMailDto): boolean {
        // TODO: Controller로 값 받는 것을 가정한다. -> GRPC로 변경 필요

        const testPattern = 'sendMail';
        const testBody = {
            userId: '3012f371-d2ee-5ba7-82da-49d47ee2d18e',
            value: 'Test value',
        };
        this.clientKafka.emit(testPattern, testBody);

        // this.producerService.sendMailService();
        return true;
    }
}
