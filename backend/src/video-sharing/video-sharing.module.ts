import { Module } from '@nestjs/common';
import { VideoSharingController } from './video-sharing.controller';
import { VideoSharingService } from './video-sharing.service';

@Module({
  controllers: [VideoSharingController],
  providers: [VideoSharingService],
})
export class VideoSharingModule {}
