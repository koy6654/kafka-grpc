import { Controller, Res } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';
import { Response } from 'express';

@Controller('consumer')
export class ConsumerController {
    constructor(private readonly consumerService: ConsumerService) {}

    @MessagePattern('sendMail')
    async processMail(@Payload() payload: any, @Ctx() conext: KafkaContext, @Res() res: Response): Promise<void> {
        this.consumerService.processMail(payload, conext);

        res.json({ data: true });
        return;
    }
}
