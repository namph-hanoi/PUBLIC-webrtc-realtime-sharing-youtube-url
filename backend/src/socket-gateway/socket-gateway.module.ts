import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [EventsGateway],
})
export class SocketGatewayModule {}
