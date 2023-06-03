import { Module } from '@nestjs/common';
import { VideoSharingController } from './video-sharing.controller';
import { VideoSharingService } from './video-sharing.service';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoSharing } from './video-sharing.entity';
import { EventsGateway } from '../socket-gateway/events.gateway';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User, VideoSharing]), JwtModule],
  controllers: [VideoSharingController],
  providers: [VideoSharingService, EventsGateway],
})
export class VideoSharingModule {}
