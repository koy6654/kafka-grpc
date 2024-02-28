import { Injectable } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
    @MessagePattern('sendMail')
    async processMail(@Payload() payload: any, @Ctx() conext: KafkaContext): Promise<boolean> {
        // 여기서부터 내일 마무리 짓기

        const originalMessage = conext.getMessage();
        console.log(payload);
        console.log(originalMessage);

        setTimeout(() => 2 * 1000);

        return true;
    }
}
