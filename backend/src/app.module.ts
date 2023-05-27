import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGatewayModule } from './socket-gateway/socket-gateway.module';

@Module({
  imports: [SocketGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
