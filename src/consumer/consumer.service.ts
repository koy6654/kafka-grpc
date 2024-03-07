import { Injectable } from '@nestjs/common';
import { Ctx, KafkaContext, Payload } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
    async processMail(payload: any, conext: KafkaContext): Promise<boolean> {
        // setTimeout(() => 2 * 1000);

        console.log('sendMail start');
        const originalMessage = conext.getMessage();
        console.log(payload);
        console.log(originalMessage);

        return true;
    }
}
