import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGatewayModule } from './socket-gateway/socket-gateway.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SocketGatewayModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
