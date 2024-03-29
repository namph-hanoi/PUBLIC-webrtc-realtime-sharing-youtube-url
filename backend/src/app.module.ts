import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGatewayModule } from './socket-gateway/socket-gateway.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { VideoSharingModule } from './video-sharing/video-sharing.module';
import { entities } from './app.entity';

let envFilePath = '../.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '../.env.production';
}

const isTestEnv = process.env.NODE_ENV === 'test';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    SocketGatewayModule,
    TypeOrmModule.forRoot({
      type: isTestEnv ? 'sqlite' : 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: isTestEnv ? ':memory:' : process.env.MYSQL_DATABASE,
      synchronize: true,
      entities,
      logging: isTestEnv ? false : !!process.env.MYSQL_LOGGING,
    }),
    AuthModule,
    UserModule,
    VideoSharingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
