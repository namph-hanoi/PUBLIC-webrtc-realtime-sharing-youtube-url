import { Module } from '@nestjs/common';
import { VideoSharingController } from './video-sharing.controller';
import { VideoSharingService } from './video-sharing.service';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [VideoSharingController],
  providers: [VideoSharingService],
})
export class VideoSharingModule {}
