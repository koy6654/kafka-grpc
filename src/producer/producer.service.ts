import { Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {
    async sendMailService(): Promise<string> {
        const result = 'sendMail done';
        console.log(result);
        return result;
    }
}
