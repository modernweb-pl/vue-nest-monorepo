import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMessage(): { message: string } {
    return { message: 'Hello World!' };
  }
}
