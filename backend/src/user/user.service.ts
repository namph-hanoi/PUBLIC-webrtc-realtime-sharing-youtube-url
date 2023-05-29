import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  testInject() {
    return 'Inject service successfully';
  }
}
