import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const sleep = (timeout: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};
